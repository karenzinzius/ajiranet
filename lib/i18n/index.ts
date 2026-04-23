import { en } from "./en";
import { sw } from "./sw";

export const translations = { en, sw };
export type Lang = "en" | "sw";
export type Translations = typeof en;