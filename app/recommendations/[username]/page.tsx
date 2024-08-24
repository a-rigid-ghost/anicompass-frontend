"use client";
import useSWR from 'swr'

type Anime = {
    mal_id: string
    title: string
    english_title: string
    image_url: string
    favourites: number
    popularity: number
    members: number
}

type Recommendations = {
    recommendationList: Anime[]
}

async function getRecommendations(username: string): Promise<Recommendations> {
    const response = await fetch(`http://127.0.0.1:5000/recommendations/${username}`)
    const data = await response.json()
    return data
}


function getHigherQualityImage(url: string): string {
    let index = url.length - 5
    if (url.charAt(index) == 'l') return url;
    return url.slice(0, index + 1) + "l" + url.slice(index + 1, url.length)
}


function prettifyStat(num: number): string {
    const formatter = new Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 3
    });
    return formatter.format(num);
}



export default function UsernameRecs( { params }: {params: {username: string}} ) {
    const { data, error } = useSWR(params.username, getRecommendations)

    console.log(data?.recommendationList.length)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <div className="grid grid-cols-5 gap-4">
                {data.recommendationList.map((anime)=>{
                    return (
                            <div className="card card-compact bg-base-100 w-80 shadow-xl">
                                <figure>
                                    <img
                                    src={anime.image_url}
                                    alt="Anime Thumbnail" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {anime.title}
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-sm btn-primary" onClick={() => window.open(`https://myanimelist.net/anime/${anime.mal_id}`, '_blank')}>View MAL</button>
                                        </div>
                                    </h2>
                                    
                                    
                                    <div className="stats shadow">

                                        <div className="stat place-items-center">
                                            <div className="stat-title">Popularity</div>
                                            <div className="stat-value text-secondary">{prettifyStat(anime.popularity)}</div>
                                        </div>

                                        <div className="stat place-items-center">
                                            <div className="stat-title">Members</div>
                                            <div className="stat-value">{prettifyStat(anime.members)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                })}
            </div>
        </>
    );
  }
  