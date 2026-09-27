import { useEffect, useRef, useState } from "react";

type Coordinates = { latitude: number; longitude: number; accuracy: number };

export default function GpsScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [message, setMessage] = useState("Camera and location access start only when requested.");
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(
    () => () => {
      const stream = videoRef.current?.srcObject;
      if (stream instanceof MediaStream) stream.getTracks().forEach((track) => track.stop());
    },
    [],
  );

  const locate = () => {
    if (!navigator.geolocation) {
      setMessage("Location services are not available in this browser.");
      return;
    }
    setMessage("Reading device location…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        });
        setMessage("Location received from your device.");
      },
      (error) => setMessage(error.message || "Location access was not granted."),
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 15_000 },
    );
  };

  const toggleCamera = async () => {
    if (cameraActive) {
      const stream = videoRef.current?.srcObject;
      if (stream instanceof MediaStream) stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraActive(false);
      setMessage("Camera stopped.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage("Camera access requires a secure context and a supported browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
      setMessage("Camera preview is active. No image is uploaded.");
    } catch {
      setMessage("Camera access was denied or no camera is available.");
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">GPS and camera scanner</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Read your device coordinates and preview the rear camera locally.
        </p>
      </header>
      <section className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={locate}
          className="rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          Read location
        </button>
        <button
          type="button"
          onClick={toggleCamera}
          className="rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          {cameraActive ? "Stop camera" : "Start camera"}
        </button>
      </section>
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {message}
      </p>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="aspect-video w-full rounded-lg bg-black object-cover"
        aria-label="Local camera preview"
      />
      {coordinates && (
        <dl className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-3">
          <Coordinate label="Latitude" value={coordinates.latitude.toFixed(6)} />
          <Coordinate label="Longitude" value={coordinates.longitude.toFixed(6)} />
          <Coordinate label="Accuracy" value={`${Math.round(coordinates.accuracy)} m`} />
        </dl>
      )}
    </main>
  );
}

function Coordinate({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}
