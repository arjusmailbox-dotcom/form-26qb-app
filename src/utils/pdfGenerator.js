import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

// Helper for safe date formatting
const safeFormatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'N/A';
        return format(date, 'dd-MM-yyyy');
    } catch (e) {
        return 'N/A';
    }
};

export async function generatePDF(formData) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('FORM 26QB', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Tax Deducted at Source on Sale of Immovable Property', 105, 22, { align: 'center' });
    doc.text('[See section 194-IA and rule 31A]', 105, 28, { align: 'center' });

    // Add border
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    let yPos = 40;

    // Section I: Transferee/Buyer Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SECTION I: TRANSFEREE/BUYER DETAILS', 15, yPos);
    yPos += 8;

    // Handle single or multiple buyers
    const buyerData = [];

    if (formData.multipleBuyers === 'no') {
        buyerData.push(
            ['PAN', formData.buyerPAN || 'N/A'],
            ['Name', formData.buyerName || 'N/A'],
            ['Mobile', formData.buyerMobile || 'N/A'],
            ['Email', formData.buyerEmail || 'N/A'],
            ['Multiple Buyers', 'NO']
        );
    } else {
        buyerData.push(
            ['Multiple Buyers', 'YES'],
            ['1st Applicant - PAN', formData.buyer1PAN || 'N/A'],
            ['1st Applicant - Name', formData.buyer1Name || 'N/A'],
            ['1st Applicant - Mobile', formData.buyer1Mobile || 'N/A'],
            ['1st Applicant - Email', formData.buyer1Email || 'N/A'],
            ['2nd Applicant - PAN', formData.buyer2PAN || 'N/A'],
            ['2nd Applicant - Name', formData.buyer2Name || 'N/A'],
            ['2nd Applicant - Mobile', formData.buyer2Mobile || 'N/A'],
            ['2nd Applicant - Email', formData.buyer2Email || 'N/A']
        );
    }

    doc.autoTable({
        startY: yPos,
        head: [],
        body: buyerData,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
        margin: { left: 15, right: 15 }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // Section II: Transferor/Seller Details
    doc.setFont('helvetica', 'bold');
    doc.text('SECTION II: TRANSFEROR/SELLER DETAILS', 15, yPos);
    yPos += 8;

    doc.autoTable({
        startY: yPos,
        head: [],
        body: [
            ['PAN', formData.sellerPAN || 'N/A'],
            ['Name', formData.sellerName || 'N/A'],
            ['Address', formData.sellerAddress || 'N/A'],
            ['PIN Code', formData.sellerPIN || 'N/A'],
            ['Mobile', formData.sellerMobile || 'N/A'],
            ['Email', formData.sellerEmail || 'N/A'],
            ['Residential Status', (formData.sellerResidentialStatus || 'N/A').toUpperCase()],
            ['Multiple Sellers', (formData.multipleSellers || 'no').toUpperCase()],
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
        margin: { left: 15, right: 15 }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // Check if new page needed
    if (yPos > 240) {
        doc.addPage();
        yPos = 20;
    }

    // Section III: Property Details
    doc.setFont('helvetica', 'bold');
    doc.text('SECTION III: PROPERTY DETAILS', 15, yPos);
    yPos += 8;

    const propertyData = [
        ['Project Name', formData.projectName === 'sobha-meadows' ? 'Sobha Meadows Whispering Hills' : 'Sobha Ridge Whispering Hills'],
        ['Flat Number', formData.propertyAddress || 'N/A'],
        ['Property Address', formData.propertyFullAddress || 'Alathara Road, Sreekaryam P O, Thiruvananthapuram'],
        ['PIN Code', formData.propertyPIN || '695017'],
        ['Date of Agreement', safeFormatDate(formData.agreementDate)],
        ['Total Value of Consideration/Property Value (₹)', formData.totalConsideration ? `Rs. ${parseFloat(formData.totalConsideration).toLocaleString('en-IN')}` : 'N/A'],
        ['Payment Type', (formData.paymentType || 'N/A').toUpperCase()],
        ['Stamp Duty Higher', (formData.stampDutyHigher || 'no').toUpperCase()],
    ];

    // Add Value Per Applicant if multiple buyers
    if (formData.multipleBuyers === 'yes' && formData.valuePerApplicant) {
        propertyData.push(['Value of Property (Each Applicant)', `Rs. ${parseFloat(formData.valuePerApplicant).toLocaleString('en-IN')}`]);
    }

    if (formData.stampDutyHigher === 'yes' && formData.stampDutyValue) {
        propertyData.push(['Stamp Duty Value', `Rs. ${parseFloat(formData.stampDutyValue).toLocaleString('en-IN')}`]);
    }

    if (formData.paymentType === 'installment') {
        propertyData.push(['Last Installment', (formData.lastInstallment || 'N/A').toUpperCase()]);
        if (formData.previousInstallmentAmount) {
            propertyData.push(['Previous Installment Amount', `Rs. ${parseFloat(formData.previousInstallmentAmount).toLocaleString('en-IN')}`]);
        }
    }

    doc.autoTable({
        startY: yPos,
        head: [],
        body: propertyData,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
        margin: { left: 15, right: 15 }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // Check if new page needed
    if (yPos > 240) {
        doc.addPage();
        yPos = 20;
    }

    // Section IV: Tax Deposit Details
    doc.setFont('helvetica', 'bold');
    doc.text('SECTION IV: TAX DEPOSIT DETAILS', 15, yPos);
    yPos += 8;

    const taxData = [
        ['Amount Paid/Credited (Incl GST)', formData.amountPaid ? `Rs. ${parseFloat(formData.amountPaid).toLocaleString('en-IN')}` : 'N/A'],
        ['Payment Date', safeFormatDate(formData.paymentDate)],
    ];

    // Add Amount Paid Per Applicant if multiple buyers
    if (formData.multipleBuyers === 'yes' && formData.amountPaidPerApplicant) {
        taxData.push(['Amount Paid for Each Applicant (Excl GST)', `Rs. ${parseFloat(formData.amountPaidPerApplicant).toLocaleString('en-IN')}`]);
    }

    taxData.push(
        ['TDS Amount', formData.tdsAmount ? `Rs. ${parseFloat(formData.tdsAmount).toLocaleString('en-IN')}` : 'N/A'],
        ['Deduction Date', safeFormatDate(formData.deductionDate)]
    );

    doc.autoTable({
        startY: yPos,
        head: [],
        body: taxData,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
        margin: { left: 15, right: 15 }
    });

    // DECLARATIONS Section
    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 220) {
        doc.addPage();
        yPos = 20;
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('DECLARATIONS', 15, yPos);
    yPos += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    // Declaration 1 - Dynamic based on sellerPreset and sellerDataConfirmed
    let declaration1;
    if (formData.sellerPreset === 'other') {
        declaration1 = '1. I have updated the seller information fields and confirm that the information is Correct';
    } else if (formData.sellerDataConfirmed) {
        declaration1 = '1. I hereby confirm that the auto-populated seller information has been verified and is Correct';
    } else {
        declaration1 = '1. I have reviewed the auto-populated seller information and, where necessary, updated it to reflect the Correct details';
    }
    doc.text(declaration1, 15, yPos);
    yPos += 8;

    // Declaration 2 - Dynamic based on propertyAddressConfirmed
    const declaration2 = formData.propertyAddressConfirmed
        ? '2. I hereby confirm that the auto-populated property address has been verified and is Correct'
        : '2. I have reviewed the auto-populated property address and, where necessary, updated it to reflect the Correct details';
    doc.text(declaration2, 15, yPos);
    yPos += 8;

    // Declaration 3
    doc.text('3. I hereby confirm that the details provided in the form are Correct to the best of my knowledge.', 15, yPos);
    yPos += 5;
    doc.text('   I understand that these details will serve as the basis for the TDS return filing.', 15, yPos);
    yPos += 15;

    // Buyer Signatures
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);

    if (formData.multipleBuyers === 'yes') {
        // Multiple buyers - show 1st and 2nd applicant
        const buyer1Name = formData.buyer1Name || 'Buyer - 1st Applicant';
        const buyer2Name = formData.buyer2Name || 'Buyer - 2nd Applicant';

        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        // First signature on left
        doc.text('S/d', 20, yPos);
        doc.text('_______________________', 20, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(buyer1Name, 20, yPos + 12);
        doc.text('(1st Applicant)', 20, yPos + 17);

        // Second signature on right
        doc.setFont('helvetica', 'bold');
        doc.text('S/d', 120, yPos);
        doc.text('_______________________', 120, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(buyer2Name, 120, yPos + 12);
        doc.text('(2nd Applicant)', 120, yPos + 17);

        yPos += 25;
    } else {
        // Single buyer
        const buyerName = formData.buyerName || 'Buyer';

        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.text('S/d', 20, yPos);
        doc.text('_______________________', 20, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(buyerName, 20, yPos + 12);
        doc.text('(Buyer)', 20, yPos + 17);

        yPos += 25;
    }

    // Footer - Generation timestamp
    yPos += 5;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(`Generated on: ${format(new Date(), 'dd-MM-yyyy HH:mm:ss')}`, 15, yPos);

    // Convert to blob
    return doc.output('blob');
}
