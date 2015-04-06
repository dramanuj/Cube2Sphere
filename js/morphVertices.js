function calcSphereCoords() {  
    scene.traverse (function (object){
    if (object.name == 'cube'){
        var cubeMesh = object.children;
        calcSphVertices(cubeMesh[0].geometry.vertices);
     }
    });
 }


function calcSphVertices(cubeVertices){
    sphMesh=[];
    for(var i=0;i<cubeVertices.length; i++){ 
        var cx = cubeVertices[i].x;
        var cy = cubeVertices[i].y;
        var cz = cubeVertices[i].z;
        sphMesh.push([cx * Math.sqrt(1.0 - cy * cy * 0.5 - cz * cz * 0.5 + cy * cy * cz * cz / 3.0), cy * Math.sqrt(1.0 - cz * cz * 0.5 - cx * cx * 0.5 + cz * cz * cx * cx / 3.0), cz * Math.sqrt(1.0 - cx * cx * 0.5 - cy * cy * 0.5 + cx * cx * cy * cy / 3.0)]);
            
        }
}





function morphVertices(scale) {  
    scene.traverse (function (object){
    if (object.name == 'cube'){
        var myMesh = object.children;
       morphMesh(myMesh,scale);
     }
    });
 }



function morphMesh(myMesh,scale){
        
        myMesh[0].geometry.verticesNeedUpdate = true;
        myMesh[0].geometry.dynamic = true;
    
    // Linear mapping from cube to sphere
       console.log(scale);
        for(var i=0;i<myMesh[0].geometry.vertices.length; i++){ 
                myMesh[0].geometry.vertices[i].x = scale*objVerts[i][0] + (1-scale)*sphMesh[i][0]; 
                myMesh[0].geometry.vertices[i].y = scale*objVerts[i][1] + (1-scale)*sphMesh[i][1];       
                myMesh[0].geometry.vertices[i].z = scale*objVerts[i][2] + (1-scale)*sphMesh[i][2]; 
            }
    }





// Helper functions

function multiplyMatrices(first, second) {
    var newMatrix = [],
        newWidth = second[0].length,
        newHeight = first.length;
    //iterating through first matrix rows
    for (var row = 0; row < newHeight; row++) {
        newMatrix[row] = [];
        //iterating through second matrix columns
        for (var column = 0; column < newWidth; column++) { 
            var sum = 0;
            //calculating sum of pairwise products
            for (var index = 0; index < first[0].length; index++) {
                sum += first[row][index] * second[index][column];
            }
            newMatrix[row][column] = sum;
        }
    }
    return newMatrix;
}


function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}