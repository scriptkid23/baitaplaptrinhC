#include<stdio.h>
#include<math.h>
#include<stdbool.h>

int main(int argc, char const *argv[]) {
  int array2D[3][5] =
  {
  	{ 1,  2,  3,  4,  5 },  //row 1
  	{ 6,  7,  8,  9,  10 }, //row 2
  	{ 11, 12, 13, 14, 15 }  //row 3
  };

  int B[100];
  int sum = 0;
    for(int j = 0; j < 5;j++){
      for(int i = 0; i < 3;i++){
        sum = sum + array2D[i][j];
      }
      B[j] = sum;
      sum = 0;
  }
  for (int  i = 0; i < 5; i++) {
    printf("%d\n",B[i]);
  }
  return 0;
}
