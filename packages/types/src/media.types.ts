export const MEDIA_TYPES = [
	"movie",
	"series",
	"game",
	"book",
	"anime",
] as const;
export type TMediaType = (typeof MEDIA_TYPES)[number];
