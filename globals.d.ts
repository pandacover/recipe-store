export {};

declare global {
	interface Recipe {
		id: string;
		created_at: string;
		name: string;
		content: string;
		author: string;
		tags: string[];
	}
}
