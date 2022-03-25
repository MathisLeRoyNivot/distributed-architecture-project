val df = spark.read
    .option("header",true)
    .csv("./StockEtablissement_utf8.csv")

df
    .filter(col("enseigne1Etablissement").isNotNull && col("activitePrincipaleEtablissement").like("56.10C"))
    .createOrReplaceTempView("sirene")

val sqlDf = spark.sql("SELECT siret, enseigne1Etablissement, codePostalEtablissement FROM sirene")

// sqlDf.printSchema()
// sqlDf.show()

sqlDf
   .repartition(1)
   .write.format("com.databricks.spark.csv").mode("overwrite")
   .option("header", "true")
   .save("C:/Users/samy/Desktop/datascience/datacsv.csv")