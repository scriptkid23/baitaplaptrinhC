#include<stdio.h>
#include<math.h>
#include<stdbool.h>

int main()
{
    int n =11;
    int A[100];
    int B[100];

    for(int i = 0; i < n;i++){
       printf("A[%d] =",i);
       scanf("%d",&A[i]);
       B[i] = A[i];
    }
//  int A[]= {5,3,3,5,3,8,5,5,7,5,8};
//  int B[]= {5,3,3,5,3,8,5,5,7,5,8};
  float P[100];
    //int listA[100];
    //listA[0] = A[0];
    int k = 0;
    int counter = 0;
    int loc[100];
    int value[100];
    for(int i= 0; i < n-1;i++){
        for(int j = i+1; j < n ; j++){
            if(A[i] == A[j]){
              A[j] = 0;
            }
        }
    }
    for(int i = 0; i < n;i++){
      if(A[i]!= 0){
        loc[k] = A[i];
        k++;
      }
      }
    //  for (int  i = 0; i < n; i++) {
    //    printf("%d\n",A[i]);
    //  }
    /*
      for(int i = 0; i < k ;i++){
       printf("%d\n",loc[i]);
     }
     */
     int m = 0;
     while (true) {
       /* code */for(int i = 0; i < n;i++){
              if(loc[m] ==B[i]){
                counter++;
              }
     }
      value[m] = counter;
      counter = 0;
     m++;
     if(m == k){
       break;
     }
     }
     printf("--------------------------------------------------------\n");
     printf("Tan suat xuat hien\n");
     for (int i = 0; i < k; i++) {

       printf("so %d: xuat hien %d lan \n",loc[i],value[i]);
     }
     printf("-------------------------------------------------------\n");
     for(int i = 0; i < k; i++){
       printf("[%-2d]:",loc[i]);
       for(int j = 0; j < value[i];j++){
         printf("*");
       }
       printf("\n");
     }
     printf("-----------------------------------------------------\n");
     int sum = 0;
     for(int i =0 ;i < k; i ++){
       sum = sum + value[i];
     }
     for(int i = 0; i < k;i++){
       P[i] = (float)((value[i]+0.0)/(sum+0.0));
     }

     printf("----------------------------------------------------\n");
     printf("xac suat xuat hien\n");
     for(int i = 0; i < k;i++){
       printf("%f\n",P[i]);
     }
    //printf("k: %d\n",k);
    return 0;

}
