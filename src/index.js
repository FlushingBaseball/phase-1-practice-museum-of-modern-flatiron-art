
const exhibitNameDisplay = document.querySelector('#exhibit-title');
const exhibitDisplayImage = document.querySelector(`#exhibit-image`);
const commentDisplayArea = document.querySelector(`#comments-section`);
const commentForm = document.querySelector(`#comment-form`);
const ticketsButton = document.querySelector(`#buy-tickets-button`);
const ticketsPurchasedDisplay = document.querySelector(`#tickets-bought`);
let NumTicketsBought = 0;




fetch(`http://localhost:3000/current-exhibits`)
.then(resp => resp.json())
.then(exhibitList =>{ 

    exhibitList.forEach(exhibit =>{

        console.log(exhibit);
        
        renderExhibit(exhibit)
        
        
    })
    
    
}

)

function renderExhibit(exhibit){
    
    exhibitDisplayImage.src = exhibit.image;
    exhibitNameDisplay.textContent = exhibit.title;
    
    let commentArray = Array.from(exhibit.comments);
    commentArray.forEach(comment =>{
        
        const newCommentP = document.createElement('p')
        newCommentP.innerText = comment
        commentDisplayArea.appendChild(newCommentP)
        
        
    })
    console.log(commentArray)
    
}

commentForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    const submittedComment = document.createElement('p')
    submittedComment.textContent = event.target[`comment-input`].value
    commentDisplayArea.appendChild(submittedComment)
    
})
    
    /**
     * 
     * When someone clicks the buy-tickets-button it updates the tickets-bought element
     *  so that it increments the number of tickets. Make sure to retain the text,
     *  it shouldn't just say 1 but instead say 1 Tickets Bought.
     */
    
    
    ticketsButton.addEventListener('click', (event) =>{
        NumTicketsBought +=1;

        fetch(`http://localhost:3000/current-exhibits`,{
            method: 'PATCH',
            body: JSON.stringify({
                tickets_bought: +1, 
            }),
            headers: {
                'Content-type': 'application/json;'
            },
         })
         .then((response)=> response.json())
         .then((json) => console.log(json));



            ticketsPurchasedDisplay.textContent = `${NumTicketsBought} Tickets Bought`;



    });