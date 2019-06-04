#include <iostream>

using namespace std;

class node {
public:
  int index;
  int data;
  node *next;
};
class Stack{
protected:
  node *Node;
  node *Top;
public:
  void setStack(){
    this->Node = this->Top = NULL;
  }
  void push(int index,int data){
    this->Node = new node();
    this->Node->index = index;
    this->Node->data = data;
    this->Node->next  = this->Top;
    this->Top = this->Node;
  }
  void pop(){
    node *temp = this->Top;
    this->Top = this->Top->next;
    delete temp;
  }
  int getTop(){
    return this->Top->data;
  }
  void show(){
    node *current = this->Top;
    cout << "INDEX"<<"\t"<<"VALUE" <<endl;
    while (current != NULL) {
      cout << current->index << "\t" << current->data << endl;
      //if(current->next != NULL) cout << ";";
      current = current->next;
    }

  }
};
class practice: public Stack{
private:
  int location[100];
public:
  void reverse(int *obj_,int *obj__){
    int temp ;
    temp = *obj_;
    *obj_ = *obj__;
    *obj__ = temp;
  }
  void sortASC(){
    node *current,*temp;
    bool swapped;
    temp = NULL;
    do{
      current = this->Top;
      swapped = false;
      while (current->next != temp) {
        if(current->data > current->next->data){
          reverse(&current->data,&current->next->data);
          swapped = true;

        }
        current = current->next;

      }
      temp = current;
    }while(swapped);
  }
  void sortDESC(){}
  int search(int value){
    node *current = this->Top;
    int counter = 0;
    int i = 0;
    while (current != NULL) {
      if(value == current->data){
        counter++;
        this->location[i] = current->index;
        i++;
      }
      current = current->next;
    }
    return counter;
  }
  void showLocation(){
    for(int i = 0 ; i< 2;i++){
      cout << this->location[i] << " ";
    }
  }
};
int main(int argc, char const *argv[]) {
  practice *myStack = new practice();
  myStack->setStack();
  int data[] = {1,2,3,5,54,5,6,-6,7,-1,2,33,86,-5,-6};
  for (int i = 0; i < 15; i++) {
    myStack->push(i,data[i]);
  }
//  cout << "TOP:" <<myStack->getTop();
    //myStack->sortASC();
    myStack->show();
    cout << endl;
    cout << myStack->search(-6) <<endl;
    myStack->showLocation();
  return 0;
}
