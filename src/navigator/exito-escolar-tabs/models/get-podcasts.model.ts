export interface IPodcastsResp {
    data: IPodcast[];
}

export interface IPodcast {
    id_podcast: number;
    imagen:     string;
    titulo:     string;
    url:        string;
}
