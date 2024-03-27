const apiKey="2a27728b95094c6f91e6b849797bf2df";/*use this api key to fetch data from the inside of NewsApi*/
const blogContainer=document.getElementById('blog-container');/*Create structure of the <main> element from index.html*/
// To search by search input
const searchField=document.getElementById('search-input');
const searchButton=document.getElementById('search-button');


// For first time visitors there has to be some pre-fetched data and not a blank screen
async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/
         top-headlines?country=us&pageSize=10&
         apiKey=${apiKey}`; /*to fetch the data through urls*/
        const response=await fetch(apiUrl); /*when there is some delay in response it still needs to await and fetch and( always use async if we use await*/
        const data=await response.json(); /*convert response to json format*/
        return data.articles;
                
    }catch (error){
        console.error("Error fetching random news",error);
        return [];/*incase if try cannot return any arrays , then catch returns an empty array*/
    }
}

searchButton.addEventListener('click',async ()=>{
    const query=searchField.ariaValueMax.trim();
    if(query!==""){
        try{
            const articles=await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
            console.error("Error Fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl=`ttps://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response=await fetch(apiUrl); /*when there is some delay in response it still needs to await and fetch and( always use async if we use await*/
        const data=await response.json(); /*convert response to json format*/
        return data.articles;
                
    }catch (error){
        console.error("Error fetching random news",error);
        return [];/*incase if try cannot return any arrays , then catch returns an empty array*/

    }
}
function displayBlogs(articles){
    /*equivalent javascript code for the div tags for the blog cards*/
    blogContainer.innerHTML="";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        // To add ..... when text length is too much in the blogcards
        const truncatedTitle=article.title.length>30?article.title.slice(0,30)+"......":article.title;
        title.textContent=truncatedTitle;
        const description = document.createElement("p");
        const truncatedContent=article.description.length>30?article.description.slice(0,120)+"......":article.description;
        description.textContent=truncatedContent;
       

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
        blogCard.appendChild(blogCard);

    });
}

// Initiate the function
(async()=>{
    try{
        const articles=await fetchRandomNews();
        displayBlogs(articles); /*to show random new in blogcards*/
    }
    catch(error){
        console.error("Error fetching random news",error);
    }

    })();

