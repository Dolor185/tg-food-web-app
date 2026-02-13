import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export const BarcodeScanner = ({ onDetected }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let controls;

    (async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCam =
          devices.find((d) => /back|rear|environment/i.test(d.label))?.deviceId ||
          devices[0]?.deviceId;

        controls = await reader.decodeFromVideoDevice(backCam, videoRef.current, (result) => {
          const text = result?.getText?.();
          if (text) {
            onDetected(text);
            if (controls) controls.stop();
            reader.reset?.();
          }
        });
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      try {
        if (controls) controls.stop();
      } catch (e) {}
      try {
        reader.reset?.();
      } catch (e) {}
    };
  }, [onDetected]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};
