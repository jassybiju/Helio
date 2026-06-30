"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { Camera, X, Check } from "lucide-react";
import { ModalProps } from "@/src/layout/ModalProvider";
import Cropper, { Area } from "react-easy-crop";

interface ProfilePictureUploadProps extends ModalProps {
  currentImage?: string;
  onImageSave: (image: string, onSuccess : ()=>void) => void;
  close : ()=>void
}

export function UpdateProfilePicModal({
  currentImage,
  onImageSave,
  close
}: ProfilePictureUploadProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(currentImage ?? null);
  console.log(imageSrc);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    console.log("TYPE", typeof file)
    setImageSrc(URL.createObjectURL(file));
  }

  function onCropComplete(_: Area, croppedPixels: Area) {
    setCroppedAreaPixels(croppedPixels);
  }
  async function onSave() {
    if (!croppedAreaPixels || !imageSrc) {
      return;
    }
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
    if(croppedImage){
      console.log(croppedImage,2232)
      onImageSave(croppedImage, ()=>{
        console.log("123HELLO")
        close()
      })
    }
  }
  async function showCroppedImage() {
    if (!croppedAreaPixels || !imageSrc) {
      return;
    }

    setCroppedImage(await getCroppedImg(imageSrc, croppedAreaPixels));
  }
  // const onCropComplete = useCallback(
  //   (croppedArea: Area, croppedAreaPixels: Area) => {
  //     setCroppedAreaPixels(croppedAreaPixels);
  //   },
  //   [],
  // );

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImageSrc(reader.result as string);
  //       setShowCropper(true);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const createImage = (url: string): Promise<HTMLImageElement> =>
  //   new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.addEventListener("load", () => resolve(image));
  //     image.addEventListener("error", (err) => reject(err));
  //     image.setAttribute("crossOrigin", "anonymous");
  //     image.src = url;
  //   });

  // const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
  //   const image = await createImage(imageSrc);
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");

  //   if (!ctx) return null;

  //   canvas.width = pixelCrop.width;
  //   canvas.height = pixelCrop.height;

  //   ctx.drawImage(
  //     image,
  //     pixelCrop.x,
  //     pixelCrop.y,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //     0,
  //     0,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //   );

  //   return new Promise((resolve) => {
  //     canvas.toBlob((blob) => {
  //       if (!blob) return;
  //       const url = URL.createObjectURL(blob);
  //       resolve(url);
  //     }, "image/jpeg");
  //   });
  // };

  // const handleSaveImage = async () => {
  //   if (!imageSrc || !croppedAreaPixels) return;

  //   setIsUploading(true);
  //   console.log(croppedAreaPixels,imageSrc)
  //   try {
  //     const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
  //     console.log(croppedImage)
  //     if (croppedImage) {
  //       onImageSave(croppedImage as string);
  //       setShowCropper(false);
  //     }
  //   } catch (error) {
  //     console.error("Error cropping image:", error);
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const handleCancel = () => {
  //   setShowCropper(false);
  //   setImageSrc(null);
  //   setCrop({ x: 0, y: 0 });
  //   setZoom(1);
  // };

  // return (
  //   <div className="min-h-[50vh] min-w-[50vw]">
  //     <div className="cropper">
  //       <input type="file" accept="image/*" onChange={onFileChange} />
  //       <div className="relative w-full h-[500px]">
  //         {imageSrc && (
  //           <Cropper
  //             image={imageSrc}
  //             crop={crop}
  //             zoom={zoom}
  //             aspect={4 / 3}
  //             onCropChange={setCrop}
  //             onCropComplete={onCropComplete}
  //             onZoomChange={setZoom}
  //           />
  //         )}
  //       </div>
  //     </div>

  //     <button onClick={showCroppedImage}>Show cropped image</button>
  //     <button onClick={() => onSave()}>Submit</button>
  //     {croppedImage ? <img src={croppedImage} alt="Cropped result" /> : null}
  //   </div>
  // );
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Profile Picture
      </h3>

  
        {/* /* Cropper View */}
        <div className="space-y-4">
          <div
            className="relative bg-gray-100 rounded-lg overflow-hidden"
            style={{ height: "400px" }}
          >
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                zoomWithScroll={true}
              />
            )}
          </div>

          {/* Zoom Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Zoom
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Min</span>
              <span>{zoom.toFixed(2)}x</span>
              <span>Max</span>
            </div>
          </div>
          <div>
            <label className=" bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 cursor-pointer transition-colors shadow-lg">
              Upload New Image
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </label>{" "}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              // onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isUploading || !croppedAreaPixels}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Check className="h-4 w-4" />
              {isUploading ? "Saving..." : "Save Picture"}
            </button>
          </div>
        </div>
      
    </div>
  );
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.translate(image.width / 2, image.height / 2);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise<string | null>((resolve) => {
    croppedCanvas.toBlob((file) => {
      resolve(file ? URL.createObjectURL(file) : null);
    }, "image/jpeg");
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

function createImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
