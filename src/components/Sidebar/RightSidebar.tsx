'use client';

import { Download, ZoomIn, ZoomOut, Maximize2, Smartphone } from 'lucide-react';
import { CANVAS_SIZES } from '@/lib/constants';

interface RightSidebarProps {
  zoom: number;
  canvasWidth: number;
  canvasHeight: number;
  mockupScale: number;
  onZoomChange: (value: number) => void;
  onCanvasSizeChange: (width: number, height: number) => void;
  onMockupScaleChange: (value: number) => void;
  onExportClick: () => void;
  isExporting: boolean;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium mb-3 block" style={{ color: 'var(--text-tertiary)' }}>
      {children}
    </span>
  );
}

function IconButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2.5 rounded-xl transition-all active:scale-95 hover:scale-105"
      style={{
        background: 'var(--bg-tertiary)',
        color: 'var(--text-secondary)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
    >
      {children}
    </button>
  );
}

export function RightSidebar({
  zoom,
  canvasWidth,
  canvasHeight,
  mockupScale,
  onZoomChange,
  onCanvasSizeChange,
  onMockupScaleChange,
  onExportClick,
  isExporting,
}: RightSidebarProps) {
  const currentPreset = CANVAS_SIZES.find(
    (size) => size.width === canvasWidth && size.height === canvasHeight
  );

  return (
    <aside
      className="w-72 flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        {/* Mockup Scale */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>목업 크기</SectionLabel>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {mockupScale}%
            </span>
          </div>
          <div
            className="flex items-center gap-2 p-2 rounded-2xl"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <IconButton onClick={() => onMockupScaleChange(Math.max(25, mockupScale - 25))}>
              <Smartphone className="w-3.5 h-3.5" />
            </IconButton>
            <input
              type="range"
              min="25"
              max="200"
              step="5"
              value={mockupScale}
              onChange={(e) => onMockupScaleChange(Number(e.target.value))}
              className="flex-1"
            />
            <IconButton onClick={() => onMockupScaleChange(Math.min(200, mockupScale + 25))}>
              <Smartphone className="w-4 h-4" />
            </IconButton>
          </div>
        </section>

        {/* Zoom Controls */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>미리보기 확대</SectionLabel>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {zoom}%
            </span>
          </div>
          <div
            className="flex items-center gap-2 p-2 rounded-2xl"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <IconButton onClick={() => onZoomChange(Math.max(25, zoom - 25))}>
              <ZoomOut className="w-4 h-4" />
            </IconButton>
            <input
              type="range"
              min="25"
              max="200"
              step="25"
              value={zoom}
              onChange={(e) => onZoomChange(Number(e.target.value))}
              className="flex-1"
            />
            <IconButton onClick={() => onZoomChange(Math.min(200, zoom + 25))}>
              <ZoomIn className="w-4 h-4" />
            </IconButton>
          </div>
        </section>

        {/* Canvas Size */}
        <section>
          <SectionLabel>캔버스 크기</SectionLabel>
          <div className="space-y-1">
            {CANVAS_SIZES.map((size) => {
              const isSelected = currentPreset?.label === size.label;
              return (
                <button
                  key={size.label}
                  onClick={() => onCanvasSizeChange(size.width, size.height)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: isSelected ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                  }}
                  onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                >
                  <div className="flex items-center gap-3">
                    <Maximize2
                      className="w-4 h-4"
                      style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-tertiary)' }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                    >
                      {size.label}
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {size.width}×{size.height}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Custom Size */}
        <section>
          <SectionLabel>직접 입력</SectionLabel>
          <div
            className="flex gap-3 p-4 rounded-2xl"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <div className="flex-1">
              <label className="text-[11px] font-medium mb-2 block" style={{ color: 'var(--text-tertiary)' }}>
                너비
              </label>
              <input
                type="number"
                value={canvasWidth}
                onChange={(e) => onCanvasSizeChange(Number(e.target.value), canvasHeight)}
                className="w-full"
              />
            </div>
            <div className="flex items-end pb-3">
              <span className="text-lg font-light" style={{ color: 'var(--text-muted)' }}>×</span>
            </div>
            <div className="flex-1">
              <label className="text-[11px] font-medium mb-2 block" style={{ color: 'var(--text-tertiary)' }}>
                높이
              </label>
              <input
                type="number"
                value={canvasHeight}
                onChange={(e) => onCanvasSizeChange(canvasWidth, Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Export Button */}
      <div className="p-5">
        <button
          onClick={onExportClick}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
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
              <span>이미지 내보내기</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center mt-3" style={{ color: 'var(--text-muted)' }}>
          PNG 또는 JPEG • 2x 해상도
        </p>
      </div>
    </aside>
  );
}
