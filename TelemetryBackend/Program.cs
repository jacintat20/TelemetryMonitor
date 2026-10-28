var builder = WebApplication.CreateBuilder(args);

// 1. Register CORS service
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => 
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// 2. Enable CORS middleware (MUST be here!)
app.UseCors();

var statuses = new[] { "Nominal", "Warning", "Critical" };
var random = new Random();

app.MapGet("/api/telemetry", () =>
{
    var data = Enumerable.Range(1, 5).Select(index => new TelemetryPoint(
        Id: index,
        SystemName: $"System-{index}",
        AltitudeFeet: random.Next(10000, 40000),
        SpeedKnots: random.Next(250, 600),
        Status: statuses[random.Next(statuses.Length)],
        Timestamp: DateTime.UtcNow
    )).ToList();

    return Results.Ok(data);
});

app.Run();

record TelemetryPoint(int Id, string SystemName, int AltitudeFeet, int SpeedKnots, string Status, DateTime Timestamp);