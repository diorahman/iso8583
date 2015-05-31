

function parent(i){


    return Math.floor((i-1)/2);
}


function leftNode(i){

    return 2*i + 1;
}


function rightNode(i){

    return 2*i + 2;
}

function swap(array, i, j){

    array[i] = [array[j], array[j]=array[i]][0];

}

function max_heap(array, i, size){

    var left = leftNode(i), right = rightNode(i);

    var max;

    if(left < size && array[left] > array[i]){

        max = left;
    }else{
        max = i;
    }


    if(right < size && array[right] > array[max]){

        max = right;
    }

    if(size != i){
        swap(array, i, max);

        max_heap(array, max, size)
    }


}


function Build_Max_Heap(array, size){


    for(var i =(size - 2)/2; i >= 0; i++){
        max_heap(array, i, size)
    }

}

function HeapSort(array, size){

    Build_Max_Heap(array, size);

    for(var i = size - 1; i >= 0; i--){
        swap(array, 0, i);

        max_heap(array, 0, i);
    }

}

var a = [1,2,3,4,4,5,2,6];


HeapSort(a , 13);

console.log(a);





