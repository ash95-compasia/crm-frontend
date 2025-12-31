import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generate professional PDF report from JSON input
 * @param {Object|string} jsonInput - The json_input field
 * @param {string|number} logId - Log ID for filename
 */
export function generateJsonInputPdf(jsonInput, logId) {
  let data;

  try {
    data = typeof jsonInput === "string" ? JSON.parse(jsonInput) : jsonInput;
  } catch {
    alert("Invalid JSON format in json_input");
    return;
  }

  // Initialize PDF with professional settings
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // Color palette
  const colors = {
    primary: [59, 89, 152],     // Dark blue
    secondary: [41, 128, 185],  // Medium blue
    accent: [236, 240, 241],    // Light gray
    text: [44, 62, 80],         // Dark text
    lightText: [127, 140, 141], // Gray text
    border: [189, 195, 199],    // Border gray
    warning: [231, 76, 60]      // Red for important items
  };

  // Set default styles
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.text);

  // ─── HEADER ──────────────────────────────────────────────────
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  // Main title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(`Credit Engine Report - ${logId}`, pageWidth / 2, 12, { align: "center" });
  
  // Report date
  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin, 12, { align: "right" });
  
  y = 30; // Reset Y position below header

  // ─── UTILITY FUNCTIONS ───────────────────────────────────────
  const sectionTitle = (title) => {
    // Add new page if needed
    if (y > 250) {
      doc.addPage();
      y = margin;
    }
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.primary);
    doc.text(title, margin, y);
    y += 6;
    
    // Underline
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  const textBlock = (label, value, important = false) => {
    if (y > 280) {
      doc.addPage();
      y = margin;
    }
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...(important ? colors.warning : colors.primary));
    doc.text(`${label}:`, margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.text);
    const textValue = value !== null && value !== undefined ? String(value) : "N/A";
    const splitText = doc.splitTextToSize(textValue, pageWidth - margin * 2 - 40);
    
    // Multi-line handling
    let yOffset = y;
    for (let i = 0; i < splitText.length; i++) {
      doc.text(splitText[i], margin + 40, yOffset);
      yOffset += 5;
    }
    
    y = yOffset + 6;
  };

  const tableFromObject = (obj, title = null, columnStyles = {}) => {
    if (title) sectionTitle(title);
    
    const keys = Object.keys(obj);
    const values = Object.values(obj).map(v => 
      v !== null && v !== undefined ? String(v) : "N/A"
    );
    
    autoTable(doc, {
      startY: y,
      head: [keys.map(k => ({ content: k, styles: { fontStyle: 'bold' }}))],
      body: [values],
      styles: {
        fontSize: 9,
        cellPadding: 3,
        textColor: colors.text,
        lineColor: colors.border,
        lineWidth: 0.2
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: { fillColor: 255 },
      alternateRowStyles: { fillColor: colors.accent },
      margin: { left: margin, right: margin },
      columnStyles,
      tableWidth: 'auto'
    });
    
    y = doc.lastAutoTable.finalY + 8;
  };

  const tableFromArray = (headings, rows, title = null, columnStyles = {}) => {
    if (title) sectionTitle(title);
    
    autoTable(doc, {
      startY: y,
      head: [headings.map(h => ({ content: h, styles: { fontStyle: 'bold' }}))],
      body: rows,
      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        textColor: colors.text,
        lineColor: colors.border,
        lineWidth: 0.2
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: { fillColor: 255 },
      alternateRowStyles: { fillColor: colors.accent },
      margin: { left: margin, right: margin },
      columnStyles,
      tableWidth: 'auto'
    });
    
    y = doc.lastAutoTable.finalY + 10;
  };

  // ─── REPORT CONTENT ──────────────────────────────────────────
  
  // BASIC INFORMATION
  sectionTitle("Basic Information");
  textBlock("Annual Income", data.annualIncome);
  textBlock("Monthly Income", data.monthlyIncome);
  textBlock("Age", data.age);
  textBlock("No. of Owners", data.noofowners);
  textBlock("Monthly Instalment", data.monthlyloaninstalment, true);
  textBlock("Order ID", data.orderId);
  textBlock("Device Amount", data.deviceInstallmentAmount);
  textBlock("Address", data.address);
  textBlock("Contact Number", data.contactNumber);
  textBlock("Entity No", data.entityNo);

  // COLLECT RESPONSE DATA
  if (data.collect_response) {
    sectionTitle("Detailed Credit Data");

    if (data.collect_response.Dats?.length) {
    data.collect_response.Dats.forEach((dat, idx) => {
      sectionTitle(`Credit Record #${idx + 1}`);
      
      // DTC Info
      if (dat.DTC) {
        tableFromObject(dat.DTC, "Debt Turn Cash", {
          1: { cellWidth: 30 },
          2: { cellWidth: 25 }
        });
      }

      // Bans
      if (dat.Bans?.length) {
        tableFromArray(
          Object.keys(dat.Bans[0]),
          dat.Bans.map(ban => Object.values(ban).map(v => v ?? "N/A")),
          "Bans & Restrictions"
        );
      }

      // Employment
      if (dat.Emps?.length) {
        tableFromArray(
          ["Employer", "Occupation", "Annual Income Range"],
          dat.Emps.map(emp => [emp.Eyr ?? "N/A", emp.Occ ?? "N/A", emp.AnnIncRng ?? "N/A"]),
          "Employment History",
          { 0: { cellWidth: 40 }, 1: { cellWidth: 30 }, 2: { cellWidth: 35 } }
        );
      }

      // Alternative Consumer Grade
      if (dat.AltCon) {
        tableFromObject(dat.AltCon, "Alternative Consumer Grade");
      }

      // NBLsts
      if (dat.NBLsts?.length) {
        tableFromArray(
          Object.keys(dat.NBLsts[0]),
          dat.NBLsts.map(nbl => Object.values(nbl).map(v => v ?? "N/A")),
          "NB Lists"
        );
      }

      // Order Item
      if (dat.OrdItm) {
        const { ReqCr, ...orderData } = dat.OrdItm;
        tableFromObject(orderData, "Order Details");
        
        if (dat.OrdItm.ReqCr) {
          tableFromObject(dat.OrdItm.ReqCr, "Order Item - Request Credit");
        }
      }

      // Personal Details
      if (dat.PerDet) {
        tableFromObject(dat.PerDet, "Personal Details");
      }

      // Payment Info
      if (dat.PmtInf) {
        sectionTitle("Payment Information");
        if (dat.PmtInf.Pmts?.length) {
          tableFromArray(
            ["Type", "Currency", "Facility", "Period", "Amount Due", "Obligation", "Submit Date"],
            dat.PmtInf.Pmts.map(p => [
              p.Csf ?? "N/A", 
              p.Cur ?? "N/A", 
              p.Fcy ?? "N/A", 
              p.Per ?? "N/A", 
              p.AmtDue ?? "N/A", 
              p.Oblig ?? "N/A", 
              p.SmtDat ?? "N/A"
            ]),
            "Payment History"
          );
        }
        
        if (dat.PmtInf.CdtExps?.length) {
          tableFromArray(
            Object.keys(dat.PmtInf.CdtExps[0]),
            dat.PmtInf.CdtExps.map(exp => Object.values(exp).map(v => v ?? "N/A")),
            "Credit Exposures"
          );
        }
        
        if (dat.PmtInf.PmtPrfs?.length) {
          tableFromArray(
            ["Type", "Facility", "Industry", "By Bus", "Obligation"],
            dat.PmtInf.PmtPrfs.map(p => [
              p.Csf ?? "N/A", 
              p.Fcy ?? "N/A", 
              p.Idt ?? "N/A", 
              p.ByBus ?? "N/A", 
              p.Oblig ?? "N/A"
            ]),
            "Payment Profiling List"
          );
        }
      }

      // Search Records
      if (dat.SrhRec) {
        sectionTitle("Search Records");
        
        if (dat.SrhRec.ID) {
            textBlock("ID", dat.SrhRec.ID);
        }
        if (dat.SrhRec.DisQuaStrDat || dat.SrhRec.DisQuaEndDat) {
            textBlock("DisQuaStrDat", dat.SrhRec.DisQuaStrDat ?? "N/A" );
            textBlock("DisQuaEndDat", dat.SrhRec.DisQuaEndDat ?? "N/A" );
        }
        if (dat.SrhRec.Tels?.length) {
          tableFromArray(
            ["Telephone Number", "Last Update Date"],
            dat.SrhRec.Tels.map(t => [t.TelNum ?? "N/A", t.LasUpdDat ?? "N/A"]),
            "Telephone Records",
            { 0: { cellWidth: 45 }, 1: { cellWidth: 30 } }
          );
        }
        
        if (dat.SrhRec.AddInfs?.length) {
          tableFromArray(
            ["Source", "Address Line 1", "Address Line 2", "Postal Code", "Full Address", "Last Update Date"],
            dat.SrhRec.AddInfs.map(a => [
                a.Src ?? "N/A", 
                a.Add1 ?? "N/A", 
                a.Add2 ?? "N/A", 
                a.PosCod ?? "N/A", 
                a.FulAdd ?? "N/A", 
                a.LasUpdDat ?? "N/A"
            ]),
            "Address History"
          );
        }
        
        if (dat.SrhRec.NamInfs?.length) {
          tableFromArray(
            ["Name", "Is Disqualified?"],
            dat.SrhRec.NamInfs.map(n => [n.Nam ?? "N/A", n.IsDQNam ?? "N/A"]),
            "Name Information"
          );
        }
        
        if (dat.SrhRec.CrtLveInfs?.length) {
          tableFromArray(
            ["Entity No", "Entity Name", "Start Date", "End Date", "Last Update"],
            dat.SrhRec.CrtLveInfs.map(c => [
              c.EntNo ?? "N/A", 
              c.EntNam ?? "N/A", 
              c.CrtLveStrDat ?? "N/A", 
              c.CrtLveEndDat ?? "N/A", 
              c.CrtLveLasUpdDat ?? "N/A"
            ]),
            "Court Leave Information List"
          );
        }
      }

      // Count Sections
      const renderCountSection = (data, title) => {
        if (data?.length) {
          sectionTitle(title);
          data.forEach((item, idx) => {
            tableFromObject(
              item, 
              `${title} ${idx + 1}`,
              { 0: { cellWidth: 40 }, 1: { cellWidth: 20 } }
            );
          });
        }
      };

      //Commercial Search Count list
      tableFromArray(
        ["Year", "Total", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dat.ComCnts.map(t => [
            t.Yr ?? "N/A",
            t.Ttl ?? "N/A",
            t.Jan ?? "N/A",
            t.Feb ?? "N/A",
            t.Mar ?? "N/A",
            t.Apr ?? "N/A",
            t.May ?? "N/A",
            t.Jun ?? "N/A",
            t.Jul ?? "N/A",
            t.Aug ?? "N/A",
            t.Sep ?? "N/A",
            t.Oct ?? "N/A",
            t.Nov ?? "N/A",
            t.Dec ?? "N/A",
            ]),
         "Commercial Search Count list");

      // Financial Search Count list
      tableFromArray(
        ["Year", "Total", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dat.FinCnts.map(t => [
            t.Yr ?? "N/A",
            t.Ttl ?? "N/A",
            t.Jan ?? "N/A",
            t.Feb ?? "N/A",
            t.Mar ?? "N/A",
            t.Apr ?? "N/A",
            t.May ?? "N/A",
            t.Jun ?? "N/A",
            t.Jul ?? "N/A",
            t.Aug ?? "N/A",
            t.Sep ?? "N/A",
            t.Oct ?? "N/A",
            t.Nov ?? "N/A",
            t.Dec ?? "N/A",
            ]),
         "Financial Search Count list");
      
      // Legal Counts
      tableFromArray(
        ["Year", "Total", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dat.LegCnts.map(t => [
            t.Yr ?? "N/A",
            t.Ttl ?? "N/A",
            t.Jan ?? "N/A",
            t.Feb ?? "N/A",
            t.Mar ?? "N/A",
            t.Apr ?? "N/A",
            t.May ?? "N/A",
            t.Jun ?? "N/A",
            t.Jul ?? "N/A",
            t.Aug ?? "N/A",
            t.Sep ?? "N/A",
            t.Oct ?? "N/A",
            t.Nov ?? "N/A",
            t.Dec ?? "N/A",
            ]),
         "Legal Counts");
         
      // Search PPS Counts
      tableFromArray(
        ["Purpose", "Start Month", "Total", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"],
        dat.SrhPpsCnts.map(t => [
            t.Pps ?? "N/A",
            t.M1Per ?? "N/A",
            t.Ttl ?? "N/A",
            t.M1 ?? "N/A",
            t.M2 ?? "N/A",
            t.M3 ?? "N/A",
            t.M4 ?? "N/A",
            t.M5 ?? "N/A",
            t.M6 ?? "N/A",
            t.M7 ?? "N/A",
            t.M8 ?? "N/A",
            t.M9 ?? "N/A",
            t.M10 ?? "N/A",
            t.M11 ?? "N/A",
            t.M12 ?? "N/A",
            ]),
         "Search Purpose Counts");

      // MLCB Transactions
      if (dat.MLCBTrns?.length) {
        tableFromArray(
          Object.keys(dat.MLCBTrns[0]),
          dat.MLCBTrns.map(trn => Object.values(trn).map(v => v ?? "N/A")),
          "Money Lender Credit Bureau Transactions list"
        );
      }

      // Litigation Traces
      if (dat.LitTrcs?.length) {
        tableFromArray(
          ["Court", "By Business", "Is Trace", "Current Year Count (NLG)", "Previous Year Count (NLG)", "Current Year Count (NoCat)", "Previous Year Count (NoCat)", "Current Year Count (Non-NLG)", "Previous Year Count (Non-NLG)"],
          dat.LitTrcs.map(t => [
            t.Crt ?? "N/A", 
            t.ByBus ?? "N/A", 
            t.IsTrc ?? "N/A", 
            t.CurYeaCntNlg ?? "N/A", 
            t.PreYeaCntNlg ?? "N/A", 
            t.CurYeaCntNoCat ?? "N/A", 
            t.PreYeaCntNoCat ?? "N/A", 
            t.CurYeaCntNonNlg ?? "N/A", 
            t.PreYeaCntNonNlg ?? "N/A"
            ]),
          "Litigation Traces"
        );
      }

      // Search Enquiries
      if (dat.SrhEnqs?.length) {
        tableFromArray(
          ["Type", "Credit Limit", "Credit Type", "Submit Date", "Purpose"],
          dat.SrhEnqs.map(s => [
            s.Idt ?? "N/A", 
            s.CdtLmt ?? "N/A", 
            s.CdtTyp ?? "N/A", 
            s.SmtDat ?? "N/A", 
            s.SrhPps ?? "N/A"
          ]),
          "Search Enquiries"
        );
      }

      // Add spacing between records
      y += 15;
    });
    }
  }

  // ─── FOOTER ──────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.3);
    doc.line(
      margin,
      doc.internal.pageSize.getHeight() - 15,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 15
    );
    
    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(...colors.lightText);
    doc.text(
      `Page ${i} of ${pageCount} • Confidential`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
    
    // Watermark
    doc.setFontSize(40);
    doc.setTextColor(230, 230, 230);
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.text(
      "CONFIDENTIAL",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() / 2,
      { align: "center", angle: 45 }
    );
    doc.setGState(new doc.GState({ opacity: 1 }));
  }

  // Save the document
  doc.save(`Credit_Report_${logId}.pdf`);
}