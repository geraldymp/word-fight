declare module "leo-profanity" {
  export function check(text: string): boolean;
  export function clean(text: string, replaceSymbol?: string): string;
  export function list(): string[];
  export function loadDictionary(lang?: string): void;
  export function add(words: string[]): void;
  export function remove(words: string[]): void;
}