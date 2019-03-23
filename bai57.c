#include<stdio.h>
#include<math.h>
#include<stdbool.h>

int main(int argc, char const *argv[]) {
  int row1,col1,row2,col2;
  int A[100][100], B[100][100],arraySum[100][100],arrayHieu[100][100];
  //kiểm tra điều kiện để thực hiện phép tính với ma trận
  do{
  printf("Nhap ma tran thu nhat\n");
  scanf("%d",&row1);scanf("%d",&col1);
  printf("Nhap ma tran thu hai\n");
  scanf("%d",&row2);scanf("%d",&col2);
  if((row1 == row2) && (col1 == col2)) break;
}while (true);
// nhap ma tran 1
  for(int i = 0; i < row1;i++){
    for(int j = 0; j < col1;j++){
      printf("A[%d][%d]:",i,j);
      scanf("%d",&A[i][j]);
    }
  }
  // nhap ma tran 2
  for(int i = 0; i < row2;i++){
    for(int j = 0; j < col2;j++){
      printf("B[%d][%d]:",i,j);
      scanf("%d",&B[i][j]);
    }
  }
  // tính tổng
  for(int i = 0; i < row2;i++){
    for(int j = 0; j < col2;j++){
      arraySum[i][j] = A[i][j]+B[i][j];
      arrayHieu[i][j] = A[i][j]-B[i][j];
    }
  }
  // in ma tran
  printf("tong ma tran\n");
  for(int i = 0; i < row2;i++){
    for(int j = 0; j < col2;j++){
    printf("%d\t",arraySum[i][j]);
    }
    printf("\n");
  }
printf("hieu ma tran\n");
  for(int i = 0; i < row2;i++){
    for(int j = 0; j < col2;j++){
    printf("%d\t",arrayHieu[i][j]);
    }
    printf("\n");
  }
  return 0;
}
