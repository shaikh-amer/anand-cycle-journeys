
import html2pdf from 'html2pdf.js';
import { supabase } from '@/integrations/supabase/client';

export const generatePDFBlob = (element: HTMLElement, fileName: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Create a clone of the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Wait for any images to load
    const images = tempContainer.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    const checkImagesLoaded = () => {
      if (loadedImages === totalImages) {
        generatePDF();
      }
    };

    const generatePDF = () => {
      const opt = {
        margin: 10,
        filename: fileName,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 794, // A4 width in pixels at 96 DPI
          height: 1123, // A4 height in pixels at 96 DPI
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      html2pdf()
        .from(clonedElement)
        .set(opt)
        .toPdf()
        .output('blob')
        .then((blob: Blob) => {
          document.body.removeChild(tempContainer);
          resolve(blob);
        })
        .catch((error: Error) => {
          document.body.removeChild(tempContainer);
          reject(error);
        });
    };

    if (totalImages === 0) {
      generatePDF();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
          checkImagesLoaded();
        } else {
          img.onload = () => {
            loadedImages++;
            checkImagesLoaded();
          };
          img.onerror = () => {
            loadedImages++;
            checkImagesLoaded();
          };
        }
      });
    }
  });
};

export const uploadPDFToSupabase = async (pdfBlob: Blob, fileName: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('bills')
    .upload(fileName, pdfBlob, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error('Supabase upload failed: ' + error.message);
  }
  
  const { data: publicUrlData } = supabase.storage
    .from('bills')
    .getPublicUrl(data.path);

  if (!publicUrlData) {
    throw new Error('Could not get public URL for the uploaded file.');
  }

  return publicUrlData.publicUrl;
};

export const downloadPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  const blob = await generatePDFBlob(element, fileName);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  const blob = await generatePDFBlob(element, fileName);
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  } else {
    throw new Error('Please disable your pop-up blocker to print.');
  }
};
