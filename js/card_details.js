fetch('./json/cards.json')
.then(function (response)
{
    return response.json()
})
.then(function (obj){
    var output="";
    var cnt=0;
    var course=document.getElementById("coursesdata");
    for(let items of obj){
        ++cnt;
        output= `
        <div class="course-card">`
            if(items.isExpired){
                output+=`<p class="expired">EXPIRED</p>`
            }
            output+=`
            <div class="card-row">
                <div class="corse-logo">
                    <img
                    src="${items.image}"
                    alt="${items.alt}"
                    />
                </div>
                <div class="course-dec">
                    <p class="course-name">${items.name}</p>
                    <p>
                        <span class="col-grey">${items.subject} | Grade ${items.grade} </span>
                        <span class="col-green">+${items.extras}</span>
                    </p>
                    <div class="class-details">`    
                        if(items.unit!="" || items.lesson!="" || items.topics!=""){
                        output+=`
                        <div>
                            <p class="summary">
                                ${items.unit} <span class="col-grey">Units</span> ${items.lesson}
                                <span class="col-grey">Lessons</span> ${items.topics}
                                <span class="col-grey">Topics</span>
                            </p>
                        </div>
                            `
                        }  
                        output+=`
                        <div>
                            <select class="class-name dropdown">`
                            for(let i=0;i<items.classname.length;i++){
                                output+= `<option value="${items.classname[i]}">${items.classname[i]}</option>`
                            }output+=`
                            </select>
                        </div>
                        <div class=student-and-date>`
                        if(items.students !="" && items.dateFrom!="" && items.dateTo!=""){
                            output+=`<p class="col-grey">
                                ${items.students} Students &nbsp;| &nbsp;${items.dateFrom} - ${items.dateTo} 
                            </p>`
                        }
                        else if(items.students=="" && items.dateFrom!="" && items.dateTo!=""){
                            output+=`<p class="col-grey">
                            ${items.dateFrom} - ${items.dateTo} 
                        </p>`
                        }
                        else if(items.students!="" && items.dateFrom=="" && items.dateTo==""){
                            output+=`<p class="col-grey">
                            ${items.students} Students
                        </p>`
                        }  
                        output+=`</div>
                    </div>
                </div>
                <div>
                    <button class="favourite btn-bg" id="fav${cnt}" alt="favourite" onclick="toggleFav(${cnt})"></button>
                </div>
            </div>
            <div class="bottom-card-logo">
                <button type="button" class="btn-preview btn-bg" id="preview${cnt}"></button>
                <button type="button" class="btn-manage btn-bg" id="manage${cnt}"></button>
                <button type="button" class="btn-reports btn-bg" id="report${cnt}"></button>
                <button type="button" class="btn-submission btn-bg" id="submission${cnt}"></button>
            </div>
        </div>
        `;
        course.innerHTML+=output;
        if(!items.preview){
            document.getElementById("preview"+cnt).style.opacity=0.5;
        }
        if(!items.manage){
            document.getElementById("manage"+cnt).style.opacity=0.5;
        }
        if(!items.submission){
            document.getElementById("submission"+cnt).style.opacity=0.5;
        }
        if(!items.report){
            document.getElementById("report"+cnt).style.opacity=0.5;
        }
        if(!items.isFavourite){
            document.getElementById("fav"+cnt).style.mixBlendMode="luminosity";
        }
    }
})

