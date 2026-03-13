import React from 'react';
export declare class I18nManager {
    static localeData: Record<string, string>;
    static setLocaleData(localeData: Record<string, string>): void;
    static translate(key: string, placeholder?: React.ReactNode): string;
}
export declare const t: typeof I18nManager.translate;
