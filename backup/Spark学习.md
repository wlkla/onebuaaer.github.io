## 学习目标
- Spark 与其他工具的区别
- Spark 的使用方法

--- 

## MapReduce 的局限性
1. 仅支持Map和Reduce两种语义操作
2. 执行效率低，时间开销大
 > 时间开销大的原因：频繁与磁盘进行交互

```mermaid
graph LR
      startPoint(File) --> mapper
      reducer --> endPoint(File)
  
      subgraph Data
          direction TB
              A(data) 
              B(data)
              C(data)
      end
      
      mapper --> A --> reducer
      mapper --> B --> reducer
      mapper --> C --> reducer
```

## Spark 的基本知识
1. Spark 是基于 RDD(弹性分布式数据集) 进行运算的
2. RDD 为只读，每次处理完后需要重新保存为一个 RDD 文件
3. WordCount 示例：
 ```
val rdd1 = sc.textFile("hdfs://node01:9000/data/wc/in/")
val rdd2 = rdd1.flatMap(_.split("\t"))
val rdd3 = rdd2.map((_, 1))
val rdd4 = rdd3.reduceByKey((_+_))
rdd4.saveAsTextFile("hdfs://node01:9000/data/wc/out/")
```
4. RDD 依赖
- 窄依赖：父RDD 中的分区最多只能被一个子 RDD 的一个分区使用；子 RDD 如果有部分分区数据丢失或损坏，只需要从对应的父 RDD 重新计算恢复
- 宽依赖：子 RDD 分区依赖父 RDD 的多个分区；子 RDD 如果部分或全部分区数据丢失或损坏，必须从对应父 RDD 分区重新计算

## Spark 用法学习
> [!NOTE]
在开发机上创建虚拟环境，安装 pyspark 进行学习

1. 读取文件存储为 RDD：`textFile = spark.read.text("file:///home/work/jingyasen/data/train.json")`
2. 对 RDD 进行行数统计：'textFile.count()'
3. 输出 RDD 的第一行：`textFile.first()`
![image](https://github.com/user-attachments/assets/bda39244-bb3f-4e7c-a99a-cf86d4c6d187)

## Spark实现wordcount
```python
# wordcount.py
from pyspark import SparkConf, SparkContext
conf = SparkConf().setAppName("wordcount").setMaster("local[2]")
sc = SparkContext(conf=conf)
sc.setLogLevel("ERROR")
inputdata = sc.textFile("file:///Users/path/word.txt")
output = inputdata.flatMap(lambda x: x.split(" ")) \
                  .map(lambda x: (x, 1)) \
                  .reduceByKey(lambda a, b: a + b) \
                  .sortBy(lambda x:x[1], ascending=False)

result = output.collect()
for i in result:
    print(i)

sc.stop()
```

## 任务提交
编写好代码后该如何提交呢，提交语法如下：
- 使用 pyspark：
```python
pyspark --master yarn --conf spark.files.ignoreCorruptFiles=true --num-executors 100 --executor-memory 4g --executor-cores 3 --driver-memory 8g
```

<!-- ##{"timestamp":1732972659}## -->