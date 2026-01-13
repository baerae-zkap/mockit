'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { GRADIENT_PRESETS, SOLID_COLORS, IPHONE_MODELS, IPHONE_COLORS, PIXEL_MODELS, PIXEL_COLORS, BROWSER_CONFIGS } from '@/lib/constants';
import type { DeviceType, BackgroundType, IPhoneModel, IPhoneColor, PixelModel, PixelColor, BrowserType, BrowserTheme } from '@/lib/types';

interface LeftSidebarProps {
  deviceType: DeviceType;
  backgroundType: BackgroundType;
  backgroundValue: string;
  shadowIntensity: number;
  iphoneModel: IPhoneModel;
  iphoneColor: IPhoneColor;
  pixelModel: PixelModel;
  pixelColor: PixelColor;
  browserType: BrowserType;
  browserTheme: BrowserTheme;
  addressUrl: string;
  onAddressUrlChange: (url: string) => void;
  tabName: string;
  onTabNameChange: (name: string) => void;
  isModelPickerOpen: boolean;
  onDeviceChange: (device: DeviceType) => void;
  onBackgroundTypeChange: (type: BackgroundType) => void;
  onBackgroundValueChange: (value: string) => void;
  onShadowIntensityChange: (value: number) => void;
  onIphoneModelChange: (model: IPhoneModel) => void;
  onIphoneColorChange: (color: IPhoneColor) => void;
  onPixelModelChange: (model: PixelModel) => void;
  onPixelColorChange: (color: PixelColor) => void;
  onBrowserTypeChange: (type: BrowserType) => void;
  onBrowserThemeChange: (theme: BrowserTheme) => void;
  onModelPickerOpenChange: (open: boolean) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium mb-3 block" style={{ color: 'var(--text-tertiary)' }}>
      {children}
    </span>
  );
}

export function LeftSidebar({
  deviceType,
  backgroundType,
  backgroundValue,
  shadowIntensity,
  iphoneColor,
  pixelColor,
  browserType,
  browserTheme,
  addressUrl,
  onAddressUrlChange,
  tabName,
  onTabNameChange,
  isModelPickerOpen,
  onDeviceChange,
  onBackgroundTypeChange,
  onBackgroundValueChange,
  onShadowIntensityChange,
  onIphoneColorChange,
  onPixelColorChange,
  onBrowserTypeChange,
  onBrowserThemeChange,
  onModelPickerOpenChange,
}: LeftSidebarProps) {

  const backgroundTypes: { type: BackgroundType; label: string }[] = [
    { type: 'gradient', label: '그라디언트' },
    { type: 'solid', label: '단색' },
    { type: 'transparent', label: '투명' },
  ];

  const currentIphoneModel = IPHONE_MODELS[0];
  const currentPixelModel = PIXEL_MODELS[0];

  const getCurrentDeviceInfo = () => {
    if (deviceType === 'iphone') {
      return { name: currentIphoneModel.name, thumb: currentIphoneModel.thumbImage };
    } else if (deviceType === 'pixel') {
      return { name: currentPixelModel.name, thumb: currentPixelModel.thumbImage };
    } else if (deviceType === 'browser') {
      const browser = BROWSER_CONFIGS.find(b => b.id === browserType);
      return { name: browser?.name || 'Safari', thumb: browser?.themes.light.thumbImage || '' };
    } else if (deviceType === 'none') {
      return { name: 'None', thumb: '' };
    }
    return { name: currentIphoneModel.name, thumb: currentIphoneModel.thumbImage };
  };

  const currentDevice = getCurrentDeviceInfo();

  return (
    <aside
      className="w-72 flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        {/* Model Selection */}
        <section>
          <SectionLabel>디바이스</SectionLabel>
          <div className="relative">
            <button
              onClick={() => onModelPickerOpenChange(!isModelPickerOpen)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--bg-tertiary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-hover)' }}
              >
                {currentDevice.thumb ? (
                  <img
                    src={currentDevice.thumb}
                    alt={currentDevice.name}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span className="text-xl" style={{ color: 'var(--text-tertiary)' }}>⊘</span>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {currentDevice.name}
                </p>
              </div>
              <ChevronDown
                className="w-5 h-5 transition-transform"
                style={{
                  color: 'var(--text-tertiary)',
                  transform: isModelPickerOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {/* Model Picker Popup */}
            <AnimatePresence>
              {isModelPickerOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100]"
                    onClick={() => onModelPickerOpenChange(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed left-4 top-20 z-[101] p-6 rounded-3xl w-[560px] max-h-[85vh] overflow-y-auto"
                    style={{
                      background: 'var(--bg-elevated)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {/* Phone Section */}
                    <p className="text-xs font-semibold mb-4 px-1" style={{ color: 'var(--text-tertiary)' }}>폰</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* iPhone */}
                      <motion.button
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          onDeviceChange('iphone');
                          onModelPickerOpenChange(false);
                        }}
                        className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl transition-colors hover:bg-[var(--bg-hover)]"
                        style={{
                          background: deviceType === 'iphone' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                        }}
                      >
                        <div className="flex-1 w-full flex items-center justify-center p-2">
                          <img src={currentIphoneModel.thumbImage} alt="" className="max-h-[180px] w-auto object-contain" />
                        </div>
                        <p className="text-base font-semibold mt-3" style={{ color: deviceType === 'iphone' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                          {currentIphoneModel.name}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          {currentIphoneModel.screenResolution}
                        </p>
                      </motion.button>

                      {/* Pixel */}
                      <motion.button
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          onDeviceChange('pixel');
                          onModelPickerOpenChange(false);
                        }}
                        className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl transition-colors hover:bg-[var(--bg-hover)]"
                        style={{
                          background: deviceType === 'pixel' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                        }}
                      >
                        <div className="flex-1 w-full flex items-center justify-center p-2">
                          <img src={currentPixelModel.thumbImage} alt="" className="max-h-[180px] w-auto object-contain" />
                        </div>
                        <p className="text-base font-semibold mt-3" style={{ color: deviceType === 'pixel' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                          {currentPixelModel.name}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          {currentPixelModel.screenResolution}
                        </p>
                      </motion.button>
                    </div>

                    {/* Browser Section */}
                    <p className="text-xs font-semibold mb-4 px-1" style={{ color: 'var(--text-tertiary)' }}>브라우저</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Safari */}
                      <motion.button
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          onDeviceChange('browser');
                          onBrowserTypeChange('safari');
                          onModelPickerOpenChange(false);
                        }}
                        className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl transition-colors hover:bg-[var(--bg-hover)]"
                        style={{
                          background: deviceType === 'browser' && browserType === 'safari' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                        }}
                      >
                        <div className="flex-1 w-full flex items-center justify-center p-2 rounded-xl overflow-hidden">
                          <img src={BROWSER_CONFIGS.find(b => b.id === 'safari')?.themes.light.thumbImage} alt="" className="max-h-[180px] w-auto object-contain rounded-lg" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        </div>
                        <p className="text-base font-semibold mt-3" style={{ color: deviceType === 'browser' && browserType === 'safari' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                          Safari
                        </p>
                      </motion.button>

                      {/* Chrome */}
                      <motion.button
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          onDeviceChange('browser');
                          onBrowserTypeChange('chrome');
                          onModelPickerOpenChange(false);
                        }}
                        className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl transition-colors hover:bg-[var(--bg-hover)]"
                        style={{
                          background: deviceType === 'browser' && browserType === 'chrome' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                        }}
                      >
                        <div className="flex-1 w-full flex items-center justify-center p-2 rounded-xl overflow-hidden">
                          <img src={BROWSER_CONFIGS.find(b => b.id === 'chrome')?.themes.light.thumbImage} alt="" className="max-h-[180px] w-auto object-contain rounded-lg" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        </div>
                        <p className="text-base font-semibold mt-3" style={{ color: deviceType === 'browser' && browserType === 'chrome' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                          Chrome
                        </p>
                      </motion.button>
                    </div>

                    {/* None Section */}
                    <p className="text-xs font-semibold mb-4 px-1" style={{ color: 'var(--text-tertiary)' }}>기타</p>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          onDeviceChange('none');
                          onModelPickerOpenChange(false);
                        }}
                        className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl transition-colors hover:bg-[var(--bg-hover)]"
                        style={{
                          background: deviceType === 'none' ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                        }}
                      >
                        <div className="flex-1 w-full flex items-center justify-center p-2">
                          <div className="w-40 h-40 flex items-center justify-center rounded-2xl" style={{ background: 'var(--bg-hover)' }}>
                            <span className="text-8xl" style={{ color: 'var(--text-tertiary)' }}>⊘</span>
                          </div>
                        </div>
                        <p className="text-base font-semibold mt-3" style={{ color: deviceType === 'none' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                          None
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                          프레임 없이 이미지만
                        </p>
                      </motion.button>

                      {/* Empty placeholder for grid alignment */}
                      <div className="aspect-square" />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Style Selection */}
        {deviceType === 'iphone' && (
          <section>
            <SectionLabel>스타일</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              {IPHONE_COLORS.map((colorOption) => {
                const isSelected = iphoneColor === colorOption.id;
                return (
                  <motion.button
                    key={colorOption.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onIphoneColorChange(colorOption.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-colors"
                    style={{
                      background: isSelected ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                    }}
                    onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-hover)')}
                    onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                  >
                    <img
                      src={colorOption.thumbImage}
                      alt={colorOption.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                    >
                      {colorOption.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}

        {deviceType === 'pixel' && (
          <section>
            <SectionLabel>스타일</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              {PIXEL_COLORS.map((colorOption) => {
                const isSelected = pixelColor === colorOption.id;
                return (
                  <motion.button
                    key={colorOption.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onPixelColorChange(colorOption.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-colors"
                    style={{
                      background: isSelected ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                    }}
                    onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-hover)')}
                    onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                  >
                    <img
                      src={colorOption.thumbImage}
                      alt={colorOption.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                    >
                      {colorOption.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}

        {deviceType === 'browser' && (
          <>
            <section>
              <SectionLabel>테마</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                {(['light', 'dark'] as const).map((theme) => {
                  const currentBrowser = BROWSER_CONFIGS.find(b => b.id === browserType);
                  const themeConfig = currentBrowser?.themes[theme];
                  const isSelected = browserTheme === theme;
                  return (
                    <motion.button
                      key={`${browserType}-${theme}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onBrowserThemeChange(theme);
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-colors"
                      style={{
                        background: isSelected ? 'var(--accent-bg)' : 'var(--bg-tertiary)',
                      }}
                      onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-hover)')}
                      onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                    >
                      <div className="w-full aspect-video rounded-lg overflow-hidden">
                        <img
                          src={themeConfig?.thumbImage}
                          alt={`${currentBrowser?.name} ${theme}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                      >
                        {theme === 'light' ? 'Light' : 'Dark'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {browserType === 'chrome' && (
              <section>
                <SectionLabel>탭 이름</SectionLabel>
                <input
                  type="text"
                  value={tabName}
                  onChange={(e) => onTabNameChange(e.target.value)}
                  placeholder="New Tab"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onBlur={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                />
              </section>
            )}

            <section>
              <SectionLabel>주소</SectionLabel>
              <input
                type="text"
                value={addressUrl}
                onChange={(e) => onAddressUrlChange(e.target.value)}
                placeholder="yourapp.com"
                className="w-full px-4 py-3 rounded-xl text-sm transition-colors"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  outline: 'none',
                }}
                onFocus={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onBlur={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
              />
            </section>
          </>
        )}

        {/* Shadow */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>그림자</SectionLabel>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {shadowIntensity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={shadowIntensity}
            onChange={(e) => onShadowIntensityChange(Number(e.target.value))}
            className="w-full"
          />
        </section>

        {/* Background */}
        <section>
          <SectionLabel>배경</SectionLabel>
          <div
            className="flex rounded-xl p-1 mb-4"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            {backgroundTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => {
                  onBackgroundTypeChange(type);
                  if (type === 'transparent') {
                    onBackgroundValueChange('transparent');
                  } else if (type === 'gradient') {
                    onBackgroundValueChange(GRADIENT_PRESETS[0].style);
                  } else {
                    onBackgroundValueChange(SOLID_COLORS[0]);
                  }
                }}
                className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: backgroundType === type ? 'var(--bg-secondary)' : 'transparent',
                  color: backgroundType === type ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  boxShadow: backgroundType === type ? 'var(--shadow-sm)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (backgroundType !== type) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (backgroundType !== type) {
                    e.currentTarget.style.color = 'var(--text-tertiary)';
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Gradient Presets */}
          <AnimatePresence>
            {backgroundType === 'gradient' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-4 gap-2"
              >
                {GRADIENT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onBackgroundValueChange(preset.style)}
                    className="relative w-full aspect-square rounded-xl overflow-hidden transition-all active:scale-95 hover:scale-105"
                    style={{
                      background: preset.style,
                      boxShadow: backgroundValue === preset.style ? '0 0 0 2px var(--accent-primary)' : 'none',
                    }}
                    title={preset.name}
                  >
                    {backgroundValue === preset.style && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Solid Colors */}
          <AnimatePresence>
            {backgroundType === 'solid' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-6 gap-2"
              >
                {SOLID_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => onBackgroundValueChange(color)}
                    className="relative w-full aspect-square rounded-xl overflow-hidden transition-all active:scale-95 hover:scale-110"
                    style={{
                      backgroundColor: color,
                      boxShadow: backgroundValue === color ? '0 0 0 2px var(--accent-primary)' : 'none',
                    }}
                    title={color}
                  >
                    {backgroundValue === color && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </aside>
  );
}
