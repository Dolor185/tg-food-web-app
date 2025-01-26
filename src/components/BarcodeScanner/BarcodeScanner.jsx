import React, { useEffect } from "react";
import Quagga from "quagga";
import "./BarcodeScanner.css"; // Импортируем стили

export const BarcodeScanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader"], // Для чтения GTIN-13
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      if (result && result.codeResult && result.codeResult.code) {
        onDetected(result.codeResult.code);
        Quagga.stop(); // Останавливаем сканер после успешного сканирования
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="interactive" className="viewport" />;
};
