import raw from '../../../site.config.json';
import type { SiteConfig } from '$lib/types';

/** リポジトリ直下の site.config.json。ビルド時に埋め込まれる。 */
export const site: SiteConfig = raw;
