const test2 = async () => {
  const PORT = config.get<number>("PORT");
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:4200",
      ],
      credentials: true,
    })
  );
  // app.use('/', router);
  app.use(helmet());
  // app.use(lusca.csrf());
  await connectPrisma();
  app.use("/api", apiLimiter);
  Routes(app);
  UserRoutes(app);

  // Listen for requests on localhost.
  app.listen(PORT, () => {
    logger.info(`app is been listen to on http://localhost:${PORT}`);
  });
};

test2();