val filePath = "./public/StockEtablissement_utf8.csv"
val nafCompanyCode = sc.getConf.get("spark.driver.codenaf")
val savePath = "./public/fastfoodNames"

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