import '@xyflow/react/dist/style.css';
import React, { useEffect, useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Node,
  Edge,
  Position,
  MarkerType
} from '@xyflow/react';
import dagre from 'dagre';
import { X, Info, Cpu, AlertTriangle } from 'lucide-react';

interface ArchitectureDiagramProps {
  nodes: Array<{
    id: string;
    label: string;
    type: 'frontend' | 'service' | 'database' | 'security' | 'external';
    description: string;
    technologies: string[];
    risks: string[];
  }>;
  edges: Array<{
    source: string;
    target: string;
  }>;
}

// Auto-layout using dagre
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 100, nodesep: 150 });

  const nodeWidth = 200;
  const nodeHeight = 100;

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Get color based on node type
const getNodeColor = (type: string) => {
  switch (type) {
    case 'frontend':
      return '#a855f7'; // Purple
    case 'service':
      return '#3b82f6'; // Blue
    case 'database':
      return '#10b981'; // Green
    case 'security':
      return '#ef4444'; // Red
    case 'external':
      return '#f97316'; // Orange
    default:
      return '#64748b'; // Gray
  }
};

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ nodes: initialNodes, edges: initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<typeof initialNodes[0] | null>(null);

  useEffect(() => {
    if (!initialNodes || !initialEdges) {
      console.log('No nodes or edges provided');
      return;
    }

    console.log('Initializing diagram with:', { initialNodes, initialEdges });

    // Convert to React Flow format
    const rfNodes: Node[] = initialNodes.map((node) => ({
      id: node.id,
      type: 'default',
      data: {
        label: (
          <div style={{ padding: '8px', textAlign: 'center' }}>
            <div style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '4px',
              opacity: 0.7
            }}>
              {node.type}
            </div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>
              {node.label}
            </div>
            {node.risks && node.risks.length > 0 && (
              <div style={{
                marginTop: '4px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                <AlertTriangle size={12} />
                {node.risks.length} risk{node.risks.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        ),
        originalNode: node
      },
      position: { x: 0, y: 0 },
      style: {
        background: getNodeColor(node.type),
        color: 'white',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: 0,
        width: 200,
        fontSize: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer'
      }
    }));

    const rfEdges: Edge[] = initialEdges.map((edge, idx) => ({
      id: `e-${idx}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      style: {
        stroke: '#94a3b8',
        strokeWidth: 2
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#94a3b8',
        width: 20,
        height: 20
      }
    }));

    // Apply layout
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(rfNodes, rfEdges);

    console.log('Setting nodes and edges:', { layoutedNodes, layoutedEdges });

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node);
    const originalNode = (node.data as any).originalNode;
    setSelectedNode(originalNode);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  console.log('Current render state:', { nodes, edges, selectedNode });

  return (
    <div style={{ width: '100%', height: '100%', background: '#f8fafc', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultEdgeOptions={{
          animated: true,
          style: { strokeWidth: 2 }
        }}
      >
        <Background
          color="#cbd5e1"
          gap={16}
          size={1}
        />
        <Controls
          style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            const originalNode = (node.data as any).originalNode;
            return getNodeColor(originalNode?.type || 'service');
          }}
          style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}
        />
      </ReactFlow>

      {/* Node Details Panel */}
      {selectedNode && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: '320px',
          maxHeight: 'calc(100% - 2rem)',
          overflowY: 'auto',
          background: 'white',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          zIndex: 10
        }}>
          {/* Close button */}
          <button
            onClick={() => setSelectedNode(null)}
            aria-label="Close details"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              borderRadius: '0.375rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={20} />
          </button>

          {/* Type badge */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.375rem 0.75rem',
              backgroundColor: getNodeColor(selectedNode.type),
              color: 'white',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {selectedNode.type}
            </span>
          </div>

          {/* Node name */}
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            paddingRight: '2rem',
            color: '#0f172a'
          }}>
            {selectedNode.label}
          </h3>

          {/* Description */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#64748b',
              letterSpacing: '0.05em'
            }}>
              <Info size={14} />
              Description
            </div>
            <p style={{
              fontSize: '0.9375rem',
              color: '#475569',
              lineHeight: 1.6,
              margin: 0
            }}>
              {selectedNode.description}
            </p>
          </div>

          {/* Technologies */}
          {selectedNode.technologies && selectedNode.technologies.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#64748b',
                letterSpacing: '0.05em'
              }}>
                <Cpu size={14} />
                Technologies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedNode.technologies.map((tech, idx) => (
                  <span key={idx} style={{
                    padding: '0.375rem 0.75rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '0.375rem',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: '#1e40af'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Risks */}
          {selectedNode.risks && selectedNode.risks.length > 0 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#dc2626',
                letterSpacing: '0.05em'
              }}>
                <AlertTriangle size={14} />
                Risks ({selectedNode.risks.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedNode.risks.map((risk, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.375rem',
                    fontSize: '0.8125rem',
                    color: '#991b1b',
                    lineHeight: 1.5
                  }}>
                    {risk}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArchitectureDiagram;