export const getItems = (query = "Seventeen") => {
  return new Promise((resolve, reject) => {
    const callbackName=`jsonpCallback_${Date.now()}`;

    window[callbackName]=(data)=>{
      if(data&&data.data){
        const items=data.data.map((track)=>({
          id:track.id,
          title:track.title,
          artist:track.artist.name,
          image:track.album.cover_medium,
          link:track.link,
          preview:track.preview,
          album:track.album.title,
          duration:track.duration,
          rank: track.rank
        }));
        resolve(items);
      }else{
        resolve([]);
      }

      document.body.removeChild(script);
      delete window[callbackName];
    };

    const script=document.createElement("script");
    script.src=`https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${callbackName}`;
    script.onerror=(err)=>{
      reject(err);
      document.body.removeChild(script);
      delete window[callbackName];
    };

    document.body.appendChild(script);
  });
};

export const getItemById=async(id,query="Seventeen")=>{
  const items=await getItems(query);
  return items.find((item)=>item.id===parseInt(id));
};



