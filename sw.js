//asignar nombre y version a la cache
const CACHE_NAME ='V1_SeminarioPWA';
urlsToChache=[
    'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
    'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
    './',
    './scriptsw.js',
    './assets/css/style.css',
    './assets/js/script.js',
    './assets/images/SeminarioPWA.png',
    './assets/images/hero-banner.png',
    'https://fonts.googleapis.com/css2?family=Mulish:wght@600;700;900&family=Quicksand:wght@400;500;600;700&display=swap',
     './favicon.svg'
]
//este se activa en la instalacion almacenando en cache los valores estaticos
self.addEventListener('install', datos=>{
  datos.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{ return cache.addAll(urlsToChache)
        .then(()=>self.skipWaiting())
    })
    .catch(err=>console.log('Falla en registro cache',err))
  )
})


//este se activa en la activacion almacenando en cache los valores estaticos
self.addEventListener('activate', datos=>{
const cacheWiteList=[CACHE_NAME]
    datos.waitUntil(
        caches.keys()
        .then(cachesNames=>{
            cachesNames.map(cachesName=>{
                //eliminamos si la cache se almaceno en el sitio
                if(cacheWiteList.indexOf(cachesName)===-1)
                    {
                    return caches.delete(cachesName)
                }                
            })
        })
        //indicar al sw cache libre y activa
        .then(()=>self.clients.claim())
    )
})


//este se activa en la recuperacion almacenando en cache los valores estaticos
self.addEventListener('fetch', datos=>{
//verificar si la url es correcta
datos.respondWith(
    caches.match(datos.request)
    .then(res=>{
        if(res){
            return res
        }
//recupera solicitud
        return fetch(datos.request)
    })
)

})