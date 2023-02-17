export interface PodcastInterface {
    data: Podcast[];
}

export interface Podcast {
    id_podcast: number;
    imagen:     string;
    titulo:     string;
    url:        string;
}
