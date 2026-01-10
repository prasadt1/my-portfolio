
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import inch

def create_resume():
    doc = SimpleDocTemplate("public/resume.pdf", pagesize=A4,
                            rightMargin=50, leftMargin=50,
                            topMargin=50, bottomMargin=50)

    styles = getSampleStyleSheet()
    story = []

    # Custom Styles
    styles.add(ParagraphStyle(name='Header', parent=styles['Heading1'], 
                              fontSize=24, spaceAfter=10, textColor=colors.HexColor('#059669'))) # Emerald-600
    styles.add(ParagraphStyle(name='SubHeader', parent=styles['Heading2'], 
                              fontSize=14, spaceAfter=20, textColor=colors.HexColor('#475569'))) # Slate-600
    styles.add(ParagraphStyle(name='SectionTitle', parent=styles['Heading3'], 
                              fontSize=16, spaceBefore=15, spaceAfter=10, 
                              textColor=colors.HexColor('#0f172a'), # Slate-900
                              borderPadding=(0, 0, 5, 0),
                              borderColor=colors.HexColor('#e2e8f0'),
                              borderWidth=1))
    styles.add(ParagraphStyle(name='RoleTitle', parent=styles['Heading4'],
                              fontSize=12, textColor=colors.HexColor('#059669'), spaceAfter=2))
    styles.add(ParagraphStyle(name='CompanyInfo', parent=styles['Normal'],
                              fontSize=10, textColor=colors.HexColor('#64748b'), spaceAfter=8))
    styles.add(ParagraphStyle(name='CustomBullet', parent=styles['Normal'],
                              fontSize=10, textColor=colors.HexColor('#334155'), 
                              leftIndent=15, spaceAfter=3, bulletIndent=5))

    # Header
    story.append(Paragraph("Prasad Tilloo", styles['Header']))
    story.append(Paragraph("Senior IT Leader & Enterprise Architect", styles['SubHeader']))
    
    # Contact Info
    contact_info = [
        ["Email: prasad.sgsits@gmail.com", "LinkedIn: linkedin.com/in/prasadtilloo"],
        ["Location: Frankfurt, Germany", "Portfolio: prasadtilloo.com"]
    ]
    t = Table(contact_info, colWidths=[240, 240])
    t.setStyle(TableStyle([
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#475569')),
        ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 20))

    # Summary
    story.append(Paragraph("Professional Summary", styles['SectionTitle']))
    summary_text = """
    Results-driven Senior Architect & Engineering Leader with 15+ years of cross-industry expertise spanning banking, telecom, e-commerce, retail, healthcare, and AdTech. 
    Proven track record of delivering transformative results through cloud-first digital transformation and AI-driven automation. 
    Specialized in designing enterprise-scale systems that handle millions of transactions, achieving 99.99% SLA uptime and $1M+ cost savings.
    """
    story.append(Paragraph(summary_text, styles['Normal']))

    # Experience
    story.append(Paragraph("Professional Experience", styles['SectionTitle']))

    # Experience Items
    experience = [
        {
            "role": "Solution Architect (DTC e-Commerce)",
            "company": "BRITA | Frankfurt, Germany",
            "date": "May 2025 – Nov 2025",
            "points": [
                "Led Shopware-to-Shopify Plus discovery across 6 EMEA markets.",
                "Designed headless reference architecture with Vue.js/Nuxt.js and Azure.",
                "Prototyped AI-driven search optimization."
            ]
        },
        {
            "role": "Senior Technical Project Manager / Lead Architect",
            "company": "SINE Foundation e.V. | Berlin, Germany",
            "date": "Oct 2022 – Jun 2024",
            "points": [
                "Boosted adoption by 25% with PACT Online Catalog cloud marketplace.",
                "Defined global Tech Specification for Product Carbon Footprint with Microsoft, SAP, Siemens.",
                "Led WBCSD PACT Standard implementation with 20+ Fortune 100 firms."
            ]
        },
        {
            "role": "Senior Engineering Manager (Freelance)",
            "company": "Delivery Hero SE | Berlin, Germany",
            "date": "Mar 2022 – Sept 2022",
            "points": [
                "Increased revenue by 20% across EMEA region by launching Display Ads product.",
                "Scaled system to support 5M+ daily transactions with 99.99% SLA.",
                "Led 10-member cross-functional team (iOS, Android, Golang)."
            ]
        },
        {
            "role": "Lead Architect",
            "company": "Boehringer Ingelheim | Ingelheim, Germany",
            "date": "Nov 2020 – Feb 2022",
            "points": [
                "Accelerated AI/ML insights by 50% through Enterprise Data Lake implementation.",
                "Led €500K cloud migration ensuring GDPR/PCI compliance."
            ]
        },
        {
            "role": "Senior Manager",
            "company": "PricewaterhouseCoopers (PwC) | Chicago, USA",
            "date": "Mar 2015 – Oct 2020",
            "points": [
                "Led $650K cloud modernization program for healthcare systems.",
                "Designed pharmacy module boosting mobile app traffic by 70%.",
                "Co-developed cloud-based Enterprise Data Lake and domain-driven microservices."
            ]
        }
    ]

    for job in experience:
        story.append(Paragraph(job['role'], styles['RoleTitle']))
        story.append(Paragraph(f"{job['company']} | {job['date']}", styles['CompanyInfo']))
        for point in job['points']:
            story.append(Paragraph(f"• {point}", styles['CustomBullet']))
        story.append(Spacer(1, 10))

    # Skills
    story.append(Paragraph("Technical Skills", styles['SectionTitle']))
    skills = [
        "<b>Cloud & DevOps:</b> AWS, Azure, GCP, Kubernetes, Docker, Terraform, CI/CD",
        "<b>Architecture:</b> Microservices, Event-Driven, Serverless, Headless Commerce, Domain-Driven Design",
        "<b>Languages & Frameworks:</b> Python, TypeScript, React, Node.js, Java, Golang, .NET",
        "<b>Data & AI:</b> AI/ML, RAG, Vector Databases, Data Lakes, Kafka, Spark",
        "<b>Compliance:</b> HIPAA, GDPR, PCI-DSS, SOC2, ISO 27001"
    ]
    for skill in skills:
        story.append(Paragraph(f"• {skill}", styles['CustomBullet']))

    # Education
    story.append(Paragraph("Education & Certifications", styles['SectionTitle']))
    story.append(Paragraph("<b>Bachelor of Engineering (Computer Science)</b> - S.G.S.I.T.S, India", styles['Normal']))
    story.append(Spacer(1, 5))
    certs = [
        "AI Agents Intensive (Google / Kaggle, 2025)",
        "Certified SAFe® 4 DevOps Practitioner (2019)",
        "AWS & Azure Architect Certifications"
    ]
    for cert in certs:
        story.append(Paragraph(f"• {cert}", styles['CustomBullet']))

    doc.build(story)
    print("Resume generated successfully at public/resume.pdf")

if __name__ == "__main__":
    create_resume()
