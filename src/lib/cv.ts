import cvDocumentUrl from '../assets/Ziyad_Tber_Software_Engineer_CV.docx?url';

const deployedCvUrl = `https://ziyadtber.netlify.app${cvDocumentUrl}`;
const cvUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(deployedCvUrl)}`;

export { cvUrl };
