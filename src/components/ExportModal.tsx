'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileImage, Image, Check } from 'lucide-react';
import type { ExportFormat, ExportOptions } from '@/lib/types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  isExporting: boolean;
  canvasWidth: number;
  canvasHeight: number;
}

interface QualityPreset {
  id: string;
  label: string;
  quality: number;
  description: string;
  sizeRatio: number;
}

const QUALITY_PRESETS: QualityPreset[] = [
  {
    id: 'max',
    label: '최고',
    quality: 100,
    description: '최상의 품질, 큰 파일',
    sizeRatio: 1.0,
  },
  {
    id: 'high',
    label: '높음',
    quality: 85,
    description: '대부분의 용도에 추천',
    sizeRatio: 0.6,
  },
  {
    id: 'medium',
    label: '보통',
    quality: 70,
    description: '품질과 크기의 균형',
    sizeRatio: 0.4,
  },
  {
    id: 'low',
    label: '작게',
    quality: 50,
    description: '작은 파일, 압축 손실 있음',
    sizeRatio: 0.25,
  },
];

function estimateFileSize(
  width: number,
  height: number,
  format: 'png' | 'jpeg',
  jpegQualityRatio: number = 1.0
): string {
  const pixelCount = width * 2 * height * 2;
  const pngBytesPerPixel = 1.2;
  const jpegBaseBytesPerPixel = 0.5;

  let sizeInBytes: number;

  if (format === 'png') {
    sizeInBytes = pixelCount * pngBytesPerPixel;
  } else {
    sizeInBytes = pixelCount * jpegBaseBytesPerPixel * jpegQualityRatio;
  }

  const sizeInMB = sizeInBytes / (1024 * 1024);

  if (sizeInMB < 1) {
    return `~${Math.round(sizeInMB * 1000)}KB`;
  }
  return `~${sizeInMB.toFixed(1)}MB`;
}

export function ExportModal({
  isOpen,
  onClose,
  onExport,
  isExporting,
  canvasWidth,
  canvasHeight,
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [selectedPreset, setSelectedPreset] = useState<string>('high');

  const handleExport = () => {
    const preset = QUALITY_PRESETS.find((p) => p.id === selectedPreset);
    onExport({
      format,
      quality: preset?.quality ?? 85,
    });
  };

  const selectedQualityPreset = QUALITY_PRESETS.find((p) => p.id === selectedPreset);

  const pngSizeEstimate = useMemo(
    () => estimateFileSize(canvasWidth, canvasHeight, 'png'),
    [canvasWidth, canvasHeight]
  );

  const jpegSizeEstimates = useMemo(
    () =>
      QUALITY_PRESETS.reduce(
        (acc, preset) => {
          acc[preset.id] = estimateFileSize(canvasWidth, canvasHeight, 'jpeg', preset.sizeRatio);
          return acc;
        },
        {} as Record<string, string>
      ),
    [canvasWidth, canvasHeight]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Header */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--accent-primary)' }}
                  >
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      이미지 내보내기
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      포맷과 품질을 선택하세요
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 0.95, backgroundColor: 'var(--bg-hover)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-5">
              {/* Canvas Info */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-2xl"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    출력 크기
                  </span>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    {canvasWidth * 2} × {canvasHeight * 2}px
                  </p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent-primary)' }}
                >
                  2x Retina
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label
                  className="text-xs font-medium mb-3 block"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  포맷
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setFormat('png')}
                    className="relative flex flex-col p-4 rounded-2xl text-left transition-colors hover:bg-[var(--bg-hover)]"
                    style={{
                      background: format === 'png' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                    }}
                  >
                    {format === 'png' && (
                      <div
                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--accent-primary)' }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: format === 'png' ? 'var(--accent-primary)' : 'var(--bg-hover)',
                      }}
                    >
                      <FileImage className="w-5 h-5" style={{ color: format === 'png' ? '#fff' : 'var(--text-tertiary)' }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: format === 'png' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      PNG
                    </span>
                    <p className="text-[11px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      무손실 • 투명 배경
                    </p>
                    <span
                      className="text-[10px] font-semibold mt-2 px-2 py-1 rounded-lg self-start"
                      style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                    >
                      {pngSizeEstimate}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setFormat('jpeg')}
                    className="relative flex flex-col p-4 rounded-2xl text-left transition-colors hover:bg-[var(--bg-hover)]"
                    style={{
                      background: format === 'jpeg' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                    }}
                  >
                    {format === 'jpeg' && (
                      <div
                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--accent-primary)' }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: format === 'jpeg' ? 'var(--accent-primary)' : 'var(--bg-hover)',
                      }}
                    >
                      <Image className="w-5 h-5" style={{ color: format === 'jpeg' ? '#fff' : 'var(--text-tertiary)' }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: format === 'jpeg' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      JPEG
                    </span>
                    <p className="text-[11px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      압축 • 작은 파일
                    </p>
                    <span
                      className="text-[10px] font-semibold mt-2 px-2 py-1 rounded-lg self-start"
                      style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                    >
                      {jpegSizeEstimates[selectedPreset]}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Quality Presets (JPEG only) */}
              <AnimatePresence>
                {format === 'jpeg' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      className="text-xs font-medium mb-3 block"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      품질
                    </label>
                    <div className="space-y-1">
                      {QUALITY_PRESETS.map((preset) => {
                        const isSelected = selectedPreset === preset.id;
                        return (
                          <motion.button
                            key={preset.id}
                            whileHover={{ scale: 0.99 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedPreset(preset.id)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors hover:bg-[var(--bg-hover)]"
                            style={{
                              background: isSelected ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                            }}
                          >
                            <div
                              className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                              style={{
                                borderColor: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                                background: isSelected ? 'var(--accent-primary)' : 'transparent',
                              }}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold" style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                                  {preset.label}
                                </span>
                                <span
                                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                                  style={{
                                    background: 'var(--bg-hover)',
                                    color: 'var(--text-tertiary)',
                                  }}
                                >
                                  {preset.quality}%
                                </span>
                              </div>
                              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                                {preset.description}
                              </p>
                            </div>
                            <span
                              className="text-[11px] font-medium"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              {jpegSizeEstimates[preset.id]}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Export Button */}
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm"
                style={{
                  background: isExporting ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                  color: isExporting ? 'var(--text-tertiary)' : '#ffffff',
                  opacity: isExporting ? 0.5 : 1,
                  cursor: isExporting ? 'not-allowed' : 'pointer',
                }}
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>내보내는 중...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>
                      {format === 'png'
                        ? 'PNG 다운로드'
                        : `JPEG 다운로드 (${selectedQualityPreset?.label})`}
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
