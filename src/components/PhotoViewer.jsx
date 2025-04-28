import { Document, Page } from 'react-pdf';

function PhotoViewer({ fileUrl }) {
  if (fileUrl.endsWith('.pdf')) {
    return <Document file={fileUrl}><Page pageNumber={1} /></Document>;
  }
  return <img src={fileUrl} alt="사진" style={{ maxWidth: '100%' }} />;
}

export default PhotoViewer;
