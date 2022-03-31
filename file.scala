val filePath = "./StockEtablissement_utf8.csv"
val nafCompanyCode = "56.10C"
val savePath = "" // C:/Users/samy/Desktop/datascience/datacsv.csv

val df = spark.read
    .option("header",true)
    .csv(filePath)

df
    .filter(col("enseigne1Etablissement").isNotNull && col("activitePrincipaleEtablissement").like(nafCompanyCode))
    .createOrReplaceTempView("sirene")

val sqlDf = spark.sql("SELECT siret, enseigne1Etablissement, codePostalEtablissement FROM sirene")

// sqlDf.printSchema()
// sqlDf.show()

sqlDf
   .repartition(1)
   .write.format("com.databricks.spark.csv").mode("overwrite")
   .option("header", "true")
   .save(savePath)