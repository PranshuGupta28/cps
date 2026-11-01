import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Central Public Sr. Sec. School, Chakghat";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#4a0f4a",
          color: "white",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 170,
            height: 170,
            borderRadius: 999,
            background: "#7b1e7b",
            border: "10px solid #f3de9b",
            fontSize: 56,
            fontWeight: 800,
            fontFamily: "serif",
          }}
        >
          CPS
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 44,
            fontWeight: 700,
            fontFamily: "serif",
            textAlign: "center",
          }}
        >
          Central Public Sr. Sec. School
        </div>
        <div style={{ marginTop: 10, fontSize: 26, color: "#f3de9b" }}>
          Chakghat, Distt. Rewa (M.P.)
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 22,
            color: "rgba(255,255,255,0.8)",
            fontStyle: "italic",
          }}
        >
          Lead me from darkness to light
        </div>
      </div>
    ),
    size,
  );
}
