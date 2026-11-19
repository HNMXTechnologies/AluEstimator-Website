import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded Open Graph card: navy blueprint grid, logo, title and a window drawing. */
export function ogImage(title: string, eyebrow = "AluEstimator") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#e8eef8",
          backgroundColor: "#0f1f3d",
          backgroundImage:
            "linear-gradient(rgba(126,166,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(126,166,255,.14) 1px, transparent 1px), linear-gradient(180deg, #1a2e57, #0f1f3d)",
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#1a2e57", border: "2px solid #7ea6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 30, height: 26, border: "3px solid #e8eef8", display: "flex" }}>
              <div style={{ flex: 1, background: "rgba(126,166,255,.45)", borderRight: "2px solid #e8eef8" }} />
              <div style={{ flex: 1, background: "rgba(126,166,255,.2)" }} />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
            <span style={{ color: "#7ea6ff" }}>Alu</span>
            <span>Estimator</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#9bb6e6" }}>{eyebrow}</div>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 16, color: "#ffffff" }}>{title}</div>
          </div>
          <div style={{ display: "flex", width: 240, height: 190, border: "8px solid #c9d2de", background: "#c9d2de", gap: 6 }}>
            <div style={{ flex: 1, background: "linear-gradient(135deg, #bcd6f5, #9fc1ec)", border: "6px solid #e9edf3" }} />
            <div style={{ flex: 1, background: "linear-gradient(135deg, #dbe9fa, #9fc1ec)", border: "6px solid #e9edf3" }} />
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#b4c3de" }}>Smart estimates for aluminium works · aluestimator.in</div>
      </div>
    ),
    ogSize,
  );
}
