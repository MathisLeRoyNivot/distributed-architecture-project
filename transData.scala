
val df = spark.read.option("header",true).csv("./SHORT_StockEtablissement_utf8.csv")
df.createOrReplaceTempView("sirene")
// Recup des fast food


df.filter(col("activitePrincipaleEtablissement").like( sc.getConf.get("spark.driver.codenaf"))).createOrReplaceTempView("sirene")

case class Departement(Code:String, Departements:String, Total:String) 
 
// Recuperation de la population
val dfpopu = spark.read.format("csv").option("header", "true").load("./population.csv")
dfpopu.createOrReplaceTempView("population")

// Affichage du nombre de fast foos par codePostal 
val sqlDFSiren = spark.sql("SELECT SUBSTRING(codePostalEtablissement, 0, 2) as code, COUNT(*) as fastfood FROM sirene GROUP BY SUBSTRING(codePostalEtablissement, 0, 2) ORDER BY code")
sqlDFSiren.createOrReplaceTempView("sireneGroupByCodeP")
sqlDFSiren.show(200,false)

// Affichage de la population
// val sqlDFPopu = spark.sql("SELECT * FROM population")
// sqlDFPopu.show()
// sqlDFPopu.printSchema()

val sqlDFJoin = spark.sql("SELECT s.Code, Departements,Total,fastfood  FROM sireneGroupByCodeP s INNER JOIN population p ON p.code=s.code")
sqlDFJoin.show()

sqlDFJoin
   .repartition(1)
   .write.format("csv")
   .mode("overwrite")
   .option("header", "true")
   .save("./fastfoodByDep")
