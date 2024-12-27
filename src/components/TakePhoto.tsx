"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function TakePhoto() {
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera", err);
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const photoUrl = canvasRef.current.toDataURL("image/png");
        setImage(photoUrl);
      }
    }
  };

  // send it to an api point and then return what that returns
  const uploadImage = async () => {};

  return (
    <>
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <div>
          <video ref={videoRef} width="100%" height="auto" autoPlay />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          />
        </div>
        <button onClick={capturePhoto}>Capture Photo</button>
        {image && (
          <div>
            <h3>Captured Image</h3>
            <Image src={image} alt="Captured" />
            <button onClick={uploadImage}>Upload Image</button>
          </div>
        )}
      </div>
    </>
  );
}
