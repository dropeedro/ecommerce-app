
export const bcController = async(req,res) => {
    try {
        const url =
        //   "https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=123456789&pass=tuPassword&firstdate=2021-01-01&lastdate=2021-01-31&timeseries=F022.TPM.TIN.D001.NO.Z.D&function=GetSeries";
          "https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=206039035&pass=SmBc4syUBeoa&firstdate=2023-03-01&lastdate=2023-03-01&timeseries=F073.TCO.PRE.Z.D&function=GetSeries";
        const response = await axios.get(url);
        // const responseData = response.data["Series"]["Obs"];
        res.json(response);
        console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
      }
}