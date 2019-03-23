#include <stdio.h>
#include <math.h>

int main(int argc, char const *argv[]) {
  int trauDung,trauNam,trauGia;

  for(int i = 1 ; i <=100;i++){
    for(int j = 1; j <=100;j++){
      for(int k = 1; k <=100;k++){
        if(((i + j + k) == 100) && ((5*i+3*j+k/3) == 100)){
          trauDung = i;
          trauNam = j;
          trauGia = k;
        }
      }
    }
  }
  printf("%d,%d,%d\n",trauDung,trauNam,trauGia);
  return 0;
}
