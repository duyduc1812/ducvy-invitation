"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { INVITE } from "./content";

type Stage = "intro" | "landing" | "invitation";

export default function Page() {
  const [stage, setStage] = useState<Stage>("intro");

  // reveal landing theo từng dòng/khối
  const [step, setStep] = useState(0);

  // envelope overlay
  const [showEnvelopeOverlay, setShowEnvelopeOverlay] = useState(false);
  const [opening, setOpening] = useState(false);

  const introLines = useMemo(() => {
    const A = INVITE.couple.groom.en;
    const B = INVITE.couple.bride.en;
    return [
      `git clone ${A.toLowerCase()}-${B.toLowerCase()}-invitation.git\n`,
      "cd invitation\n",
      "npm i\n",
      "npm run build\n",
      "npm run start\n",
      "\n✔ Server started\n",
      "\nRender landing…",
    ];
  }, []);

  // Reset reveal khi vào landing
  useEffect(() => {
    if (stage !== "landing") return;
    setStep(0);
    setShowEnvelopeOverlay(false);

    // schedule reveal: cứ 500ms hiện thêm 1 block
    const delays = [700, 900, 900, 1000, 1000, 1000, 900, 1200, 1600]; // tổng 8 block
    let i = 0;
    const timers: number[] = [];

    const tick = () => {
      i += 1;
      setStep(i);

      if (i >= 9) {
        // đủ nội dung -> bật phong bì che lên
        timers.push(
          window.setTimeout(() => setShowEnvelopeOverlay(true), 650)
        );
        return;
      }

      timers.push(window.setTimeout(tick, delays[i] ?? 500));
    };

    timers.push(window.setTimeout(tick, delays[0]));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [stage]);

  const openEnvelope = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      setStage("invitation");
      setOpening(false);
      setShowEnvelopeOverlay(false);
    }, 850);
  };

  const A = INVITE.couple.groom.en;
  const B = INVITE.couple.bride.en;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <AnimatePresence mode="wait">
        {/* ========= INTRO TERMINAL ========= */}
        {stage === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6"
          >
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow">
              <div className="mb-3 text-sm text-neutral-400">
                terminal — ducvy-invitation
              </div>
              <pre className="whitespace-pre-wrap text-sm leading-6">
                <TypeAnimation
                  sequence={[
                    ...introLines,
                    650,
                    () => {
                      setStage("landing");
                    },
                  ]}
                  speed={70}
                  repeat={0}
                  cursor
                />
              </pre>
            </div>
          </motion.section>
        )}

        {/* ========= LANDING CARD (REVEAL DẦN TỪNG DÒNG) ========= */}
        {stage === "landing" && (
          <motion.section
            key="landing"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-8 sm:px-6 sm:py-10"
          >
            <div className="relative w-full max-w-md">
              {/* Card giống ảnh */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8 shadow">
                {/* 1) label */}
                <Reveal show={step >= 1}>
                  <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                    Wedding Invitation
                  </div>
                </Reveal>

                {/* 2) title */}
                <Reveal show={step >= 2}>
                  <h1 className="mt-3 text-2xl sm:text-3xl font-semibold">{A} & {B}</h1>
                </Reveal>

                {/* 3) date */}
                <Reveal show={step >= 3}>
                  <div className="mt-2 text-sm text-neutral-300">
                    Save the Date {INVITE.dates.weddingDate}
                  </div>
                </Reveal>

                {/* 4) story box */}
                <Reveal show={step >= 4}>
                  <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-5">
                    <div className="text-sm text-neutral-300">Our story:</div>

                    <Reveal show={step >= 5}>
                      <div className="mt-2 text-sm font-medium text-neutral-100">
                        {INVITE.story.metLine}
                      </div>
                    </Reveal>

                    <Reveal show={step >= 6}>
                      <div className="mt-4 text-xs text-neutral-400">
                        {INVITE.dates.milestoneLabel}: {INVITE.dates.milestoneDate}
                      </div>
                    </Reveal>

                    <Reveal show={step >= 7}>
                      <div className="mt-2 text-xs text-neutral-400">
                        {INVITE.closingLine}
                      </div>
                    </Reveal>
                  </div>
                </Reveal>

                {/* 5) hearts row */}
                <Reveal show={step >= 8}>
                  <div className="mt-6 text-center text-sm">
                    <span className="text-pink-400">
                      {"💗".repeat(1)}
                    </span>
                    <span className="mx-2 text-neutral-500">^_^</span>
                    <span className="text-pink-400">
                      {"💗".repeat(1)}
                    </span>
                  </div>
                </Reveal>

                {/* footer */}
                <Reveal show={step >= 8}>
                  <div className="mt-6 text-xs leading-5 text-neutral-400">
                    {INVITE.footerLine}
                  </div>
                </Reveal>
              </div>

              {/* ===== Envelope overlay: che card sau khi reveal xong ===== */}
              <AnimatePresence>
                {showEnvelopeOverlay && (
                  <motion.div
                    key="envelopeOverlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 grid place-items-center"
                  >
                    {/* lớp nền che */}
                    <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[2px]" />

                    {/* phong bì đỏ */}
                    <motion.div
                      initial={{ scale: 0.96, y: 18, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      className="relative w-[92%] max-w-[520px]"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
						{/* Giữ tỉ lệ phong bì, tự co theo màn hình */}
						<div className="relative w-full aspect-[3/4] max-h-[78vh]">
                          <motion.div
                            className="absolute inset-4 rounded-2xl"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(165,40,34,0.95) 0%, rgba(165,40,34,0.95) 64%, rgba(150,34,29,0.95) 64%, rgba(150,34,29,0.95) 100%)",
                            }}
                            animate={opening ? { scale: 0.995 } : { scale: 1 }}
                            transition={{ duration: 0.35 }}
                          />

                          <motion.div
                            className="absolute left-4 right-4 top-4 h-[55%] origin-top rounded-2xl"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(170,44,38,0.9) 0%, rgba(140,30,26,0.9) 100%)",
                              clipPath:
                                "polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)",
                              boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
                            }}
                            animate={
                              opening
                                ? { rotateX: 70, y: -18, opacity: 0.95 }
                                : { rotateX: 0, y: 0, opacity: 1 }
                            }
                            transition={{
                              duration: 0.9,
                              ease: [0.2, 0.9, 0.2, 1],
                            }}
                          />

                          {/* seal */}
                          <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center">
                            <motion.button
                              type="button"
                              onClick={openEnvelope}
                              aria-label="Open invitation"
                              className="relative grid h-16 w-16 place-items-center rounded-full outline-none"
                              style={{
                                background:
                                  "radial-gradient(circle at 30% 30%, rgba(100,70,10,0.95), rgba(55,35,5,0.95) 55%, rgba(25,18,3,0.98) 100%)",
                                boxShadow:
                                  "0 0 0 6px rgba(170,120,10,0.18), 0 0 30px rgba(255,200,80,0.18)",
                              }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                              animate={
                                opening
                                  ? { scale: 0.92, opacity: 0 }
                                  : { scale: 1, opacity: 1 }
                              }
                              transition={{ duration: 0.25 }}
                            >
                              <span className="text-[10px] tracking-[0.25em] text-neutral-200/85">
                                OPEN
                              </span>
                            </motion.button>
                          </div>

                          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-neutral-200/70">
                            Click the seal to open the invitation
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* ========= FULL INVITATION (TẠM GIỮ ĐƠN GIẢN, BẠN SẼ THAY THEO MẪU ẢNH SAU) ========= */}
        {stage === "invitation" && (
          <motion.section
            key="invitation"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto min-h-screen max-w-3xl px-6 py-10"
          >
            <div className="relative rounded-3xl border border-neutral-800 bg-neutral-950/70 p-6 shadow">
              <button
                type="button"
                onClick={() => setStage("landing")}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-200 hover:bg-neutral-900"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="rounded-2xl border border-neutral-800 p-5">
                <div className="text-center">
                  <div className="text-sm tracking-[0.35em] text-neutral-200">
                    THIỆP MỜI
                  </div>

                  <div className="mt-4 text-3xl font-semibold">
                    {A} - {B}
                  </div>

                  <div className="mt-3 text-sm text-neutral-300">
                    {INVITE.dates.weddingDate}
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40">
                  <div className="grid h-[50vh] sm:h-[520px] place-items-center text-sm text-neutral-400">
                    (Ảnh cưới sẽ đặt ở đây)
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function Reveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
