import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface WebcamCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  initialImage?: string;
}

export const SAMPLE_PHOTO_PRESETS = [
  {
    name: 'Scientific Calculator',
    url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'School Blazer / Jacket',
    url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Water Bottle',
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Student ID Card',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Geometry / Pencil Box',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Spectacles / Glasses',
    url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Keychain / Keys',
    url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80'
  },
  {
    name: 'Backpack / Gym Bag',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
  }
];

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, initialImage }) => {
  const [mode, setMode] = useState<'camera' | 'upload' | 'preset'>('camera');
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(initialImage || null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err: any) {
      console.warn('Camera access could not be initialized:', err);
      setCameraError('Webcam not detected or permission denied. You can select a school preset photo or upload a file.');
      setIsStreaming(false);
      setMode('preset');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  useEffect(() => {
    if (mode === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mode, capturedImage]);

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      onCapture(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        onCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPreset = (url: string) => {
    setCapturedImage(url);
    onCapture(url);
  };

  const retake = () => {
    setCapturedImage(null);
    onCapture('');
    if (mode === 'camera') {
      startCamera();
    }
  };

  return (
    <div className="space-y-3">
      {/* Mode Selector Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600 gap-1">
        <button
          type="button"
          onClick={() => { setMode('camera'); setCapturedImage(null); }}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition ${
            mode === 'camera' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          Terminal Camera
        </button>
        <button
          type="button"
          onClick={() => { setMode('preset'); stopCamera(); }}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition ${
            mode === 'preset' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          School Presets
        </button>
        <button
          type="button"
          onClick={() => { setMode('upload'); stopCamera(); }}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition ${
            mode === 'upload' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Upload Image
        </button>
      </div>

      {/* Captured Image Preview */}
      {capturedImage ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group">
          <img
            src={capturedImage}
            alt="Captured item"
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={retake}
              className="px-3.5 py-1.5 bg-white/95 text-slate-800 rounded-lg text-xs font-semibold shadow hover:bg-white flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retake / Change
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-emerald-600/90 text-white text-[11px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Photo Attached
          </div>
        </div>
      ) : (
        <>
          {/* Live Webcam View */}
          {mode === 'camera' && (
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 aspect-video flex flex-col items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover mirror"
              />

              {/* Viewfinder Guide Overlay */}
              <div className="pointer-events-none absolute inset-4 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center">
                <span className="text-[11px] text-white/70 bg-black/40 px-2 py-0.5 rounded">
                  Hold item inside frame
                </span>
              </div>

              {cameraError && (
                <div className="absolute inset-0 bg-slate-900/90 p-4 text-center flex flex-col items-center justify-center text-white">
                  <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="text-xs text-slate-200 mb-3">{cameraError}</p>
                  <button
                    type="button"
                    onClick={() => setMode('preset')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500"
                  >
                    Use School Presets Instead
                  </button>
                </div>
              )}

              {isStreaming && (
                <div className="absolute bottom-3 inset-x-0 flex justify-center">
                  <button
                    type="button"
                    onClick={takeSnapshot}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 transition"
                  >
                    <Camera className="w-4 h-4" />
                    Snap Photo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Preset Photos */}
          {mode === 'preset' && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <p className="text-xs text-slate-500">
                Pick a matching stock photo if terminal webcam is busy:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {SAMPLE_PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => selectPreset(preset.url)}
                    className="group relative rounded-lg overflow-hidden border border-slate-200 hover:border-blue-500 transition aspect-square text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                      <span className="text-[10px] text-white line-clamp-1 block leading-tight">
                        {preset.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* File Upload Mode */}
          {mode === 'upload' && (
            <label className="border-2 border-dashed border-slate-300 hover:border-blue-400 bg-white rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition text-center">
              <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-medium text-slate-700">Choose an image from terminal storage</span>
              <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG or WebP up to 5MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </>
      )}
    </div>
  );
};
