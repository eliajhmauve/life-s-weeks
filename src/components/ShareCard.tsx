import { forwardRef } from "react";

interface ShareCardProps {
  lifePercent: number;
  lifeExpectancy: number;
  quoteText: string;
  quoteAuthor: string;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ lifePercent, lifeExpectancy, quoteText, quoteAuthor }, ref) => {
    const pastWidth = Math.min(lifePercent, 100);

    return (
      <div
        ref={ref}
        style={{
          width: 600,
          height: 400,
          background: "linear-gradient(135deg, #f5f0e8 0%, #ede4d4 100%)",
          padding: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Noto Serif TC', serif",
          color: "#2a2218",
          position: "absolute",
          left: -9999,
          top: -9999,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            人生倒數計時器
          </div>
          <div style={{ fontSize: 13, color: "#8a7e6e" }}>
            預期壽命 {lifeExpectancy} 歲
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: "#c96830" }}>
            {lifePercent.toFixed(1)}%
          </div>
          <div style={{ fontSize: 16, color: "#6b5e4e", marginTop: 4 }}>
            的人生已經過去
          </div>
          {/* Progress bar */}
          <div
            style={{
              marginTop: 20,
              height: 8,
              borderRadius: 4,
              background: "#ddd5c8",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pastWidth}%`,
                height: "100%",
                borderRadius: 4,
                background: "linear-gradient(90deg, #c96830, #d4873e)",
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: "#8a7e6e", fontStyle: "italic" }}>
            「{quoteText}」— {quoteAuthor}
          </div>
          <div style={{ fontSize: 11, color: "#c96830", marginTop: 8, fontWeight: 500 }}>
            最好的時間是現在
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";

export default ShareCard;
