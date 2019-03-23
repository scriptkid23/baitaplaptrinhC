#include <stdio.h>
#include <stdbool.h>
#include <math.h>

int main(int argc, char const *argv[]) {
  int n ;
  int A[100];
  int loc[100];


  bool check = false;
  printf("n:");
  scanf("%d",&n);
  for(int i = 0; i < n;i++){
      printf("A[%d] =",i);
      scanf("%d",&A[i]);
  }
  int x ;
  int counter = 0;
  int k = 0;
  printf("nhap x = ");
  scanf("%d",&x);
  for(int i = 0; i < n;i++){
      if(x == A[i]){
          check = true;
          counter++;
          loc[k] = i;
          k++;
      }

  }
  if(check == false) printf("khong co gia tri nao cua x trong day\n");
  if(check == true){
      printf("x = %d xuat hien trong mang A\n",x);
      printf("xuat hien %d lan\n",counter);
      printf("xuat hien o nhung vi tri\n");
      for(int i = 0; i < counter; i++)
      {
          printf("%d",loc[i]);
      }

  }
  return 0;
}
