## 学习任务
1. 了解集群
2. 熟悉Hadoop常用命令，注意删除命令的谨慎使用（尽量不用）

---

## 了解集群
1. 集群Cluster为一个产品线内具有同类功能的服务器的集合。

## 熟悉Hadoop常用命令
1. `hadoop fs –ls/-lsr <path>`：列出在指定目录下的文件内容
![image](https://github.com/user-attachments/assets/123f7af4-50c5-47ac-80b4-b502854a270b)
2. `hadoop fs –du <path>`：列出指定文件系统空间总量
![image](https://github.com/user-attachments/assets/332912d2-aa67-4d97-8be0-171e29da8c5a)
4. 'hadoop fs –mv <src> <dst>'：将指定文件移动到指定位置
![image](https://github.com/user-attachments/assets/d0a0022a-bcdf-4b8c-84c2-7af88064353e)
5. `hadoop fs –cp <src> <dst>`：拷贝文件到目标位置
![image](https://github.com/user-attachments/assets/d3b66e78-b31a-4a22-9ab1-12da6d425089)
6. `hadoop fs –rm/-rmr [-skipTrash] <src>`：删除指定文件
![image](https://github.com/user-attachments/assets/974c2e24-eff4-44ff-b913-af8080e52668)
7. `hadoop fs –put/-copyFromLocal/-moveFromLocal <localsrc> <dst>`：从本地系统拷贝文件到DFS
![image](https://github.com/user-attachments/assets/1c2fcb5d-a970-4737-8f57-795942c53031)
8. `hadoop fs –get/–copyToLocal [-ignoreCrc] [-crc] <src> <localdst>`：从DFS拷贝文件到本地文件系统
![image](https://github.com/user-attachments/assets/d653212d-5ebf-4979-a6b0-f1f73e5f5bd0)
9. `hadoop fs –cat <src>`：展示文件内容
![image](https://github.com/user-attachments/assets/26a314a4-19f4-4e8c-8bb0-dee51ad2eec6)
10. `hadoop fs –mkdir <path>`：在指定位置创建目录
![image](https://github.com/user-attachments/assets/5f37a34c-22ae-4bed-aa53-804fbcb9387a)
11. `hadoop fs –help [cmd]`：帮助命令
![image](https://github.com/user-attachments/assets/7988bd21-6b3d-4288-82a8-84ae9377f25b)

## 总结
今天主要是学习了一些基本命令，感觉除了Hadoop的基本命令除了多了一些固定前缀`hadoop fs`，逻辑上与Linux命令并没有十分大的区别，因此整体来说学下来并没有太大问题。