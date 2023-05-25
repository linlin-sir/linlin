// 频道对象
export type ChannelItem = {
    id: number;
    name: string;
}

// 频道接口响应数据
export type ChannelResData = {
    data: {
        channels: ChannelItem[];
    };
    message: string;
}

// 文章对象
export type ArticleItem = {
    "art_id": string,
    "title": string,
    "aut_id": string,
    "comm_count": number,
    "pubdate": string,
    "aut_name": string,
    "is_top": number,
    "cover": {
        "type": number,
        "images": string[]
    }
}

export type ArticleResData = {
    data: {
        pre_timestamp: string;
        results: ArticleItem[];
    }
    message: string
}


