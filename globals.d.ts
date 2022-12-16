export {};

declare global {
	interface Recipe {
		id: string;
		created_at: string;
		name: string;
		content: string;
		tags: string[];
	}
}
