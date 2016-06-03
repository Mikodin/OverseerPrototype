package com.overseer;

import static spark.Spark.*;

public class Server {
  private static final String IP_ADRESS = "localhost";
  private static final int PORT = 8080;


  public static void main(String[] args) {
    setIpAddress(IP_ADRESS);
    setPort(PORT);
    staticFileLocation("/web");

    //Have to fix this, it is only here to make it so that the server stays up.
    get("/helloSpark", (req, res) -> "index.html");
  }
}
